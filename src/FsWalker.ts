import { glob } from 'glob';
import { FileSource } from './FileSource';

export class FsWalker {
	static makeFile(source: string): FileSource {
		return new FileSource(source);
	}

	static makeFilesFromGlob(pattern: string): FileSource[] {
		return glob
			.sync(pattern)
			.map((source: string) => new FileSource(source));
	}
}
