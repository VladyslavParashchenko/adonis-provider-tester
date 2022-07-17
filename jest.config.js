module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	verbose: false,
	testMatch: ['**/spec/*.spec.ts'],
	testPathIgnorePatterns: ['build'],
}
