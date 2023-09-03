import fromCwd from 'from-cwd';
import fs from 'node:fs';
import { describe, expect, it } from 'vitest';
import { FileSource } from '../FileSource';
import { FsWalker } from '../FsWalker';

describe('FsWalker', () => {
	it('Should return the FileSource', () => {
		const file = FsWalker.getFile('src/__specs__/fixtures/glob-1/f1.md');
		expect(file.readAsText().trim()).toBe('# F1');
	});

	it('Should read search pattern and return array of the FileSource', () => {
		const sources = FsWalker.getFilesByMask('src/__specs__/fixtures/glob-1/*.{md,mdx}');
		const allIsFileSource = sources.every((source) => {
			return expect(source).toBeInstanceOf(FileSource);
		});
		expect(sources).toHaveLength(4);
		expect(allIsFileSource).toBe(true);
	});
});
