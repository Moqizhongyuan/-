export function getCrc(data: ArrayBuffer): number {
  const crcTable = generateCRCTable();
  let crc = 0xffffffff; // 初始值为全 1
  const view = new DataView(data);
  const length = data.byteLength;

  // 计算 CRC32
  for (let i = 0; i < length; i++) {
    let byte = view.getUint8(i);
    crc = (crc >>> 8) ^ crcTable[(crc ^ byte) & 0xff];
  }

  return crc ^ 0xffffffff; // 返回 CRC32 校验值
}

// 生成 CRC32 查找表
function generateCRCTable(): number[] {
  const table: number[] = [];
  for (let i = 0; i < 256; i++) {
    let crc = i;
    for (let j = 8; j > 0; j--) {
      crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1;
    }
    table[i] = crc;
  }
  return table;
}

export function getCrcHex(crc: number): string {
  // 将数字 CRC 转换为 8 位的十六进制字符串
  return crc.toString(16).padStart(8, "0"); // 保证长度为 8 位，前面补零
}
