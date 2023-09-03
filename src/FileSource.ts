import fromCwd from 'from-cwd';
import fs from 'node:fs';
import path from 'node:path';

export class FileSource {
	protected source: string;

	constructor(source: string) {
		this.source = path.isAbsolute(source) ? source : fromCwd(source);
	}

	/** @throws {Error} */
	readAsText(): string {
		return fs.readFileSync(this.source, 'utf-8');
	}

	/** @throws {Error} */
	readAsJson(): unknown {
		return JSON.parse(this.readAsText());
	}

	/** @throws {Error} */
	write(content: string): void {
		fs.writeFileSync(this.source, content, 'utf-8');
	}

	/** @throws {Error} */
	remove(): void {
		fs.unlinkSync(this.source);
	}

	exists(): boolean {
		return fs.existsSync(this.source) && fs.lstatSync(this.source).isFile();
	}
}
