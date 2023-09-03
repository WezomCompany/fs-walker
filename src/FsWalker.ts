import { glob } from 'glob';
import { FileSource } from './FileSource';

export class FsWalker {
	static makeFilesFromGlob(pattern: string): FileSource[] {
		return glob
			.sync(pattern)
			.map((source: string) => new FileSource(source));
	}
}
