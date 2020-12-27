# GitHub Action - Create Annotations

Use this action to create annotations during a GitHub Workflow action.

Create annotations with the structure as reported in https://docs.github.com/en/free-pro-team@latest/rest/reference/checks#annotations-items

## Example

```
    - name: Upload linting results
      uses: kibalabs/github-action-create-annotations@main
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}
        json-file-path: ./lint-results.json
```

See other Kib Labs repositories for more examples
