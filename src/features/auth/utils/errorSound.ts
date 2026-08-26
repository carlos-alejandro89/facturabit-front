function writeAscii(view: DataView, offset: number, value: string) {
  for (let index = 0; index < value.length; index += 1) {
    view.setUint8(offset + index, value.charCodeAt(index));
  }
}

export function createErrorSoundDataUri() {
  const sampleRate = 22050;
  const duration = 0.18;
  const sampleCount = Math.floor(sampleRate * duration);
  const buffer = new ArrayBuffer(44 + sampleCount * 2);
  const view = new DataView(buffer);

  writeAscii(view, 0, "RIFF");
  view.setUint32(4, 36 + sampleCount * 2, true);
  writeAscii(view, 8, "WAVE");
  writeAscii(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeAscii(view, 36, "data");
  view.setUint32(40, sampleCount * 2, true);

  for (let index = 0; index < sampleCount; index += 1) {
    const time = index / sampleRate;
    const envelope = Math.sin(Math.PI * (index / sampleCount)) ** 1.4;
    const tone =
      Math.sin(2 * Math.PI * 330 * time) * 0.7 +
      Math.sin(2 * Math.PI * 247 * time) * 0.3;
    view.setInt16(44 + index * 2, tone * envelope * 32767, true);
  }

  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let index = 0; index < bytes.length; index += 1) {
    binary += String.fromCharCode(bytes[index]);
  }

  return `data:audio/wav;base64,${btoa(binary)}`;
}

export function createSuccessSoundDataUri() {
  const sampleRate = 22050;
  const duration = 0.24;
  const sampleCount = Math.floor(sampleRate * duration);
  const buffer = new ArrayBuffer(44 + sampleCount * 2);
  const view = new DataView(buffer);

  writeAscii(view, 0, "RIFF");
  view.setUint32(4, 36 + sampleCount * 2, true);
  writeAscii(view, 8, "WAVE");
  writeAscii(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeAscii(view, 36, "data");
  view.setUint32(40, sampleCount * 2, true);

  for (let index = 0; index < sampleCount; index += 1) {
    const time = index / sampleRate;
    const progress = index / sampleCount;
    const frequency = progress < 0.48 ? 440 : 659.25;
    const localProgress = progress < 0.48 ? progress / 0.48 : (progress - 0.48) / 0.52;
    const envelope = Math.sin(Math.PI * localProgress) ** 1.5;
    const tone = Math.sin(2 * Math.PI * frequency * time);
    view.setInt16(44 + index * 2, tone * envelope * 0.72 * 32767, true);
  }

  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let index = 0; index < bytes.length; index += 1) {
    binary += String.fromCharCode(bytes[index]);
  }

  return `data:audio/wav;base64,${btoa(binary)}`;
}

export function createLogoutSoundDataUri() {
  const sampleRate = 22050;
  const duration = 0.2;
  const sampleCount = Math.floor(sampleRate * duration);
  const buffer = new ArrayBuffer(44 + sampleCount * 2);
  const view = new DataView(buffer);

  writeAscii(view, 0, "RIFF");
  view.setUint32(4, 36 + sampleCount * 2, true);
  writeAscii(view, 8, "WAVE");
  writeAscii(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeAscii(view, 36, "data");
  view.setUint32(40, sampleCount * 2, true);

  for (let index = 0; index < sampleCount; index += 1) {
    const time = index / sampleRate;
    const progress = index / sampleCount;
    const frequency = progress < 0.48 ? 493.88 : 329.63;
    const localProgress = progress < 0.48 ? progress / 0.48 : (progress - 0.48) / 0.52;
    const envelope = Math.sin(Math.PI * localProgress) ** 1.5;
    view.setInt16(
      44 + index * 2,
      Math.sin(2 * Math.PI * frequency * time) * envelope * 0.65 * 32767,
      true,
    );
  }

  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let index = 0; index < bytes.length; index += 1) {
    binary += String.fromCharCode(bytes[index]);
  }

  return `data:audio/wav;base64,${btoa(binary)}`;
}
