## Description

This is a basic CLI tool that will export all templates from a Mandrill account

## Usage

```
yarn install
export MANDRILL_APIKEY="abc123"   # Configure your Mandrill API key
yarn run export                   # Export all templates to disk
```

## Output

The CLI will write all templates to disk as per the following example in the `export` folder:

```
› tree export
export
├── forget-password-email
│   ├── draft.html
│   ├── metadata.json
│   └── published.html
<snipped>
└── welcome-email
    ├── draft.html
    ├── metadata.json
    ├── published.html
    └── unpublished.diff
```

- The directory name represents the `slug` of the template
- `published.html` represents the `published_code` field of the template (the currently published template)
- `draft.html` represents the `code` fields of the template (unpublished by previewable version of the template)
- `metadata.json` the remaining properties of the template
- `unpublished.diff` is an optional file that represents the diff between the draft and published version of the template (if a difference exists)
