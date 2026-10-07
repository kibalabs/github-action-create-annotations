# GitHub Action - Create Annotations

Use this action to create annotations during a GitHub Workflow action.

Create annotations with the structure as reported in https://docs.github.com/en/rest/checks/runs#create-a-check-run (`output.annotations`).

The job needs `checks: write` permission for the token it is given.

## Example

If you are using this within a job that should report the results directly, you can use:

```
    - name: Upload linting results
      uses: kibalabs/github-action-create-annotations@v1
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}
        json-file-path: ./lint-results.json
```

The annotations are added to the job's own check. GitHub only lets Actions set that check's result, so use `fail-on-error` (default `true`) to fail the job when there are failure annotations.

If you'd like to use this within a longer job and report the results as a separate check, use this:

```
    - name: Upload typing results
      uses: kibalabs/github-action-create-annotations@v1
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}
        json-file-path: ./typing-results.json
        check-name: type-package
        fail-on-error: false
```

See other Kiba Labs repositories for more examples.

## Development

Build with `make build`, which bundles `src/` into `runnable/index.js`. GitHub runs that file directly, so commit it with every source change.

To release, bump `version` in `package.json` in a PR, then run the Release workflow on `main` (Actions → Release → Run workflow). It tags `vX.Y.Z`, publishes the release and moves the `vX` tag to it, so `@v1` always points at the latest 1.x release. Versions with a pre-release suffix (e.g. `1.1.0-rc1`) are published as pre-releases and don't move `vX`. Only the release workflow can push version tags.
