module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'], // Padrão de localização dos arquivos de teste
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1' // Mapeamento de caminho para imports absolutos
  }
}
