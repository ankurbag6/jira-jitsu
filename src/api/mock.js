const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export async function mockFetch(data, ms = 500, failRate = 0.2) {
  await delay(ms);
  if (Math.random() < failRate) throw new Error('Network error');
  return structuredClone(data);
}