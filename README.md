# Castor-Build-Action

A build action for building Zoo Tycoon 2 mods with Castor.

## Example

Upload to GitHub release on release.

```yml
name: Castor

on:
  release:
    types: [published]

jobs:
  build:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
    - name: Checkout
      uses: actions/checkout@v2
    - name: Castor
      uses: ZtModArchive/Castor-Build-Action@1.0.0
    - uses: svenstaro/upload-release-action@v2
      with:
        repo_token: ${{ secrets.GITHUB_TOKEN }}
        file_glob: true
        file: "**/*.z2f"
        tag: ${{ github.ref }}
        overwrite: true
```
