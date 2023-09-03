import { glob } from 'glob';
import { FileSource } from './FileSource';

export class FsWalker {
	static getFile(source: string): FileSource {
		return new FileSource(source);
	}

	static getFilesByMask(pattern: string): FileSource[] {
		return glob
			.sync(pattern)
			.map((source: string) => new FileSource(source));
	}
}
