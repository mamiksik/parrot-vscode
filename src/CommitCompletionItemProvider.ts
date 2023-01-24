
import * as vscode from 'vscode';
import { fetchCommitMessage } from './utils';

export class CommitCompletionItemProvider implements vscode.CompletionItemProvider {
    async provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): Promise<vscode.CompletionItem[]> {
        console.log("Invoked");
        
        if (
			document.languageId !== 'scminput'
            || document.uri.scheme !== 'vscode-scm'
			// || position.character > 0
            // && context.triggerKind === vscode.CompletionTriggerKind.Invoke
		) { return []; }

        const suggestions = await fetchCommitMessage(5);
        let completionItems: vscode.CompletionItem[] = [];
        for (const suggestion of suggestions) {
            completionItems.push({
                'label': suggestion.token_str
            });
        }
        
        return completionItems;
    }
}
