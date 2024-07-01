module.exports = [
    {
        name: 'Kotlin Hello World',
        reqObject: {
            language: 'kotlin',
            code: 'fun main() { println("Hello, World!") }',
            input: ''
        },
        expectedResponse: {
            val: 'Hello, World!\n',
            status: 200,
            error: null
        }
    },
    {
        name: 'Swift Hello World',
        reqObject: {
            language: 'swift',
            code: 'print("Hello, World!")',
            input: ''
        },
        expectedResponse: {
            val: 'Hello, World!',
            status: 200,
            error: null
        }
    },
    {
        name: 'Perl Hello World',
        reqObject: {
            language: 'perl',
            code: 'print "Hello, World!\\n";',
            input: ''
        },
        expectedResponse: {
            val: 'Hello, World!\n',
            status: 200,
            error: null
        }
    },
    {
        name: 'Python Hello World',
        reqObject: {
            language: 'python',
            code: 'print("Hello, World!")',
            input: ''
        },
        expectedResponse: {
            val: 'Hello, World!\n',
            status: 200,
            error: null
        }
    },
    {
        name: 'C++ Hello World',
        reqObject: {
            language: 'cpp',
            code: '#include <iostream>\nusing namespace std;\n\nint main() { cout << "Hello, World!" << endl; return 0; }',
            input: ''
        },
        expectedResponse: {
            val: 'Hello, World!\n',
            status: 200,
            error: null
        }
    },
    // Add more test cases for different scenarios...
];
const axios = require('axios');
const { describe, expect, it } = require('@jest/globals');
const testCases = require('./testJson');

const ENDPOINT = process.env.ENDPOINT || 'http://localhost:3000/api/execute/';

describe('Code Execution API Tests', () => {
    testCases.forEach((testCase) => {
        it(testCase.name, async () => {
            try {
                const response = await axios.post(ENDPOINT, testCase.reqObject);

                // Check output or error based on response type
                if (typeof response.data.output === 'object') {
                    // Validate structured response
                    expect(response.data.output.score).toBeDefined();
                    expect(response.data.output.rationale.positives).toBeDefined();
                    expect(response.data.output.rationale.negatives).toBeDefined();
                    expect(response.data.output.points).toBeDefined();
                } else {
                    // Validate plain output
                    expect(response.data.output).toBe(testCase.expectedResponse.val);
                }

                // Validate status and error fields
                expect(response.status).toBe(testCase.expectedResponse.status);
                expect(response.data.error).toBe(testCase.expectedResponse.error);
            } catch (error) {
                // Handle unexpected errors or test failures
                console.error(`Test "${testCase.name}" failed:`, error.message);
                throw error;
            }
        }, 20000); // Timeout in milliseconds (e.g., 20 seconds)
    });
});

