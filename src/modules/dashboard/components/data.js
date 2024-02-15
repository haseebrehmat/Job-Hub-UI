export default Array.from({ length: 20 }, (_, x) => ({
    name: `User-${x + 1}`,
    total: Math.floor(Math.random() * 300) + 600,
    prospects: Math.floor(Math.random() * 600) + 1,
    warm: Math.floor(Math.random() * 600) + 1,
    hot: Math.floor(Math.random() * 600) + 1,
    cold: Math.floor(Math.random() * 600) + 1,
    hired: Math.floor(Math.random() * 600) + 1,
    rejected: Math.floor(Math.random() * 600) + 1,
}))
