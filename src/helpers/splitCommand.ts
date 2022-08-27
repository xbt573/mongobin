export function splitCommand(input: string): string {
    if (input.includes('\n')) {
        return input.split('\n').slice(1).join('\n');
    }

    return input.split(' ').slice(1).join(' ')
}
