import { inflateSync } from 'zlib';
import fs from 'fs';
import path from 'path';

const foregroundImages = [
  'src/assets/images/orbs/orb_wood.png',
  'src/assets/images/orbs/orb_fire.png',
  'src/assets/images/orbs/orb_earth.png',
  'src/assets/images/orbs/orb_metal.png',
  'src/assets/images/orbs/orb_water.png',
  'src/assets/images/talismans/talisman_red.png',
  'src/assets/images/pillars/pillar_sealed.png',
  'src/assets/images/pillars/pillar_unsealed.png',
  'src/assets/images/ui/ui_gold_panel.png',
];

describe('foreground image assets', () => {
  it.each(foregroundImages)('%s has transparent background pixels', relativePath => {
    const stats = readPngAlphaStats(path.join(process.cwd(), relativePath));

    expect(stats.colorType).toBe(6);
    expect(stats.transparentPixels).toBeGreaterThan(stats.totalPixels * 0.08);
    expect(stats.cornerAlphas.every(alpha => alpha === 0)).toBe(true);
  });
});

function readPngAlphaStats(filePath: string) {
  const file = fs.readFileSync(filePath);
  const pngSignature = '89504e470d0a1a0a';

  expect(file.subarray(0, 8).toString('hex')).toBe(pngSignature);

  let offset = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  let interlace = 0;
  const idatChunks: Buffer[] = [];

  while (offset < file.length) {
    const length = file.readUInt32BE(offset);
    const type = file.subarray(offset + 4, offset + 8).toString('ascii');
    const data = file.subarray(offset + 8, offset + 8 + length);

    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
      interlace = data[12];
    } else if (type === 'IDAT') {
      idatChunks.push(Buffer.from(data));
    } else if (type === 'IEND') {
      break;
    }

    offset += length + 12;
  }

  expect(bitDepth).toBe(8);
  expect(interlace).toBe(0);

  const bytesPerPixel = 4;
  const rowBytes = width * bytesPerPixel;
  const inflated = inflateSync(Buffer.concat(idatChunks));
  const pixels = Buffer.alloc(width * height * bytesPerPixel);
  let sourceOffset = 0;
  let targetOffset = 0;
  let previousRow = Buffer.alloc(rowBytes);

  for (let y = 0; y < height; y++) {
    const filterType = inflated[sourceOffset++];
    const row = Buffer.from(inflated.subarray(sourceOffset, sourceOffset + rowBytes));
    sourceOffset += rowBytes;
    unfilterRow(row, previousRow, bytesPerPixel, filterType);
    row.copy(pixels, targetOffset);
    targetOffset += rowBytes;
    previousRow = row;
  }

  let transparentPixels = 0;
  for (let index = 3; index < pixels.length; index += 4) {
    if (pixels[index] === 0) {
      transparentPixels++;
    }
  }

  const cornerAlphas = [
    alphaAt(pixels, width, 0, 0),
    alphaAt(pixels, width, width - 1, 0),
    alphaAt(pixels, width, 0, height - 1),
    alphaAt(pixels, width, width - 1, height - 1),
  ];

  return {
    colorType,
    totalPixels: width * height,
    transparentPixels,
    cornerAlphas,
  };
}

function unfilterRow(row: Buffer, previousRow: Buffer, bytesPerPixel: number, filterType: number) {
  for (let index = 0; index < row.length; index++) {
    const left = index >= bytesPerPixel ? row[index - bytesPerPixel] : 0;
    const up = previousRow[index] ?? 0;
    const upLeft = index >= bytesPerPixel ? previousRow[index - bytesPerPixel] : 0;

    if (filterType === 1) {
      row[index] = wrapByte(row[index] + left);
    } else if (filterType === 2) {
      row[index] = wrapByte(row[index] + up);
    } else if (filterType === 3) {
      row[index] = wrapByte(row[index] + Math.floor((left + up) / 2));
    } else if (filterType === 4) {
      row[index] = wrapByte(row[index] + paethPredictor(left, up, upLeft));
    }
  }
}

function wrapByte(value: number) {
  return value % 256;
}

function paethPredictor(left: number, up: number, upLeft: number) {
  const predictor = left + up - upLeft;
  const leftDistance = Math.abs(predictor - left);
  const upDistance = Math.abs(predictor - up);
  const upLeftDistance = Math.abs(predictor - upLeft);

  if (leftDistance <= upDistance && leftDistance <= upLeftDistance) {
    return left;
  }

  if (upDistance <= upLeftDistance) {
    return up;
  }

  return upLeft;
}

function alphaAt(pixels: Buffer, width: number, x: number, y: number) {
  return pixels[(y * width + x) * 4 + 3];
}
