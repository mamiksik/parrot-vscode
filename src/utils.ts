import * as vscode from "vscode";
import { GitExtension, Repository } from "./api/git";
import fetch from 'node-fetch';

const API_DIFF_ENDPOINT = 'http://127.0.0.1:8000/summarize-raw';

export const getMainRepostiory = () => {
  const gitExtensions = vscode.extensions.getExtension<GitExtension>("vscode.git");
  if (!gitExtensions || !gitExtensions.exports) {
    throw new Error("Git extension not found! Git extension must be enabled for this plugin to work");
  }

  const gitApi = gitExtensions.exports.getAPI(1);
  return gitApi.repositories[0];
};

export const fetchCommitMessage = async (predictionCount: number): Promise<any[]> => {
	const repository = getMainRepostiory();
	const changes = await repository.diff(true);
	const payload = {
		'inputs': changes,
    'num_return_sequences': predictionCount
	};

	const response = await fetch(API_DIFF_ENDPOINT, {
		method: 'post',
		body: JSON.stringify(payload),
		headers: {'Content-Type': 'application/json'}
	});
	
	if (!response.ok) {
    throw new Error("An error occured while fetching the commit message predictions. Check the inference server is running");
	}

	const suggestions = await response.json();
  return Promise.resolve(suggestions);

	// if (suggestions.length === 0) {
	// 	return Promise.reject();
	// }

	// let topPrediction = suggestions[0].token_str;
	// topPrediction = topPrediction.charAt(0).toUpperCase() + topPrediction.slice(1); // Capitalize
	// repository.inputBox.value = topPrediction;
};

export const capitalize = (input: string): string => {
  return input.charAt(0).toUpperCase() + input.slice(1);
};


export const documentFilters: Array<vscode.DocumentFilter | string> = [
  { language: 'php' },
  { language: 'powershell' },
  { language: 'jade' },
  { language: 'python' },
  { language: 'r' },
  { language: 'razor' },
  { language: 'ruby' },
  { language: 'rust' },
  { language: 'scss' },
  { language: 'search-result' },
  { language: 'shaderlab' },
  { language: 'shellscript' },
  { language: 'sql' },
  { language: 'swift' },
  { language: 'typescript' },
  { language: 'vb' },
  { language: 'xml' },
  { language: 'yaml' },
  { language: 'markdown' },
  { language: 'bat' },
  { language: 'clojure' },
  { language: 'coffeescript' },
  { language: 'jsonc' },
  { language: 'c' },
  { language: 'cpp' },
  { language: 'csharp' },
  { language: 'css' },
  { language: 'dockerfile' },
  { language: 'fsharp' },
  { language: 'git-commit' },
  { language: 'go' },
  { language: 'groovy' },
  { language: 'handlebars' },
  { language: 'hlsl' },
  { language: 'html' },
  { language: 'ini' },
  { language: 'java' },
  { language: 'javascriptreact' },
  { language: 'javascript' },
  { language: 'json' },
  { language: 'less' },
  { language: 'log' },
  { language: 'lua' },
  { language: 'makefile' },
  { language: 'ignore' },
  { language: 'properties' },
  { language: 'objective-c' },
  { language: 'perl' },
  { language: 'perl6' },
  { language: 'typescriptreact' },
  { language: 'yml' },
  '*',
];