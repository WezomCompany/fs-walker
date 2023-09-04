import { glob } from 'glob';
import { FileSource } from './FileSource';

export class FsWalker {
	static defineFile(source: string): FileSource {
		return new FileSource(source);
	}

	static defineFilesByMask(pattern: string): FileSource[] {
		return glob
			.sync(pattern)
			.map((source: string) => new FileSource(source));
	}
}
