# GitHub Action - Create Annotations

Use this action to create annotations during a GitHub Workflow action.

Create annotations with the structure as reported in https://docs.github.com/en/free-pro-team@latest/rest/reference/checks#annotations-items

## Example

If you are using this within a job that should report the results directly, you can use:

```
    - name: Upload linting results
      uses: kibalabs/github-action-create-annotations@main
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}
        json-file-path: ./lint-results.json
```

If you'd like to use this within a longer job and report the results as a separate check, use this:

```
    - name: Upload typing results
      uses: kibalabs/github-action-create-annotations@main
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}
        json-file-path: ./typing-results.json
        check-name: type-package
        fail-on-error: false
```

See other Kiba Labs repositories for more examples.
