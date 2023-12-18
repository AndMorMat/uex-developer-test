export function Warning({ text }) {
    if (!text) return null;
    return <div>{text}</div>;
}
