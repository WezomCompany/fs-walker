import fromCwd from 'from-cwd';
import fs from 'node:fs';
import { describe, expect, it } from 'vitest';
import { FileSource } from '../FileSource';

describe('FileSource', () => {
	it('Should read text file', () => {
		const fileSource = new FileSource('./src/__specs__/fixtures/demo.txt');
		const textFileContent = fileSource.readAsText();
		expect(textFileContent).toBe('Hello world!\n');
	});

	it('Should read text file with the absolute path', () => {
		const fileSource = new FileSource(
			fromCwd('./src/__specs__/fixtures/demo.txt')
		);
		const textFileContent = fileSource.readAsText();
		expect(textFileContent).toBe('Hello world!\n');
	});

	it('Should throw an error when reading a non-existent file', () => {
		const fileSource = new FileSource(
			'./src/__specs__/fixtures/non-existent.txt'
		);
		const throwFn = (): void => {
			fileSource.readAsText();
		};
		expect(throwFn).toThrow();
	});

	it('Should read json file and parse it', () => {
		const fileSource = new FileSource('./src/__specs__/fixtures/demo.json');
		const json = fileSource.readAsJson();
		expect(json).toEqual({
			key: 'value',
			number: 3.14,
			bool: true,
		});
	});

	it('Should write text file', () => {
		const fileSource = new FileSource(
			'./src/__specs__/fixtures/write/demo.txt'
		);
		fileSource.write('Hello world!\n');
		const result = fs.readFileSync(
			fromCwd('./src/__specs__/fixtures/write/demo.txt'),
			'utf-8'
		);
		expect(result).toBe('Hello world!\n');
	});

	it('Should throw an error when writing a file in a non-existent directory', () => {
		const fileSource = new FileSource(
			'./src/__specs__/fixtures/write/non-existent/demo.txt'
		);
		const throwFn = (): void => {
			fileSource.write('Hello world!\n');
		};
		expect(throwFn).toThrow();
	});

	it('Should remove file', () => {
		const filepath = fromCwd('src/__specs__/fixtures/remove/demo.txt');
		fs.writeFileSync(filepath, 'Hello world!\n', 'utf-8');

		const fileSource = new FileSource(
			'src/__specs__/fixtures/remove/demo.txt'
		);
		fileSource.remove();
		expect(fs.existsSync(filepath)).toBe(false);
	});

	it('Should throw an error when removing a non-existent file', () => {
		const fileSource = new FileSource(
			'./src/__specs__/fixtures/remove/non-existent.txt'
		);
		const throwFn = (): void => {
			fileSource.remove();
		};
		expect(throwFn).toThrow();
	});

	it('Should safaly check if file exists', () => {
		const fileSource = new FileSource(
			'./src/__specs__/fixtures/non-existent.txt'
		);
		expect(fileSource.exists()).toBe(false);
	});

	it('Should return absolute path', () => {
		const fileSource = new FileSource('./src/__specs__/fixtures/demo.json');
		expect(fileSource.getAbsolutePath()).toBe(
			fromCwd('./src/__specs__/fixtures/demo.json')
		);
	});

	it('Should return parent directory path', () => {
		const fileSource = new FileSource('./src/__specs__/fixtures/demo.txt');
		expect(fileSource.getDirPath()).toBe(
			fromCwd('./src/__specs__/fixtures')
		);
	});
});
