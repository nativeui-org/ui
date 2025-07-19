# Contributing to NativeUI

Thank you for your interest in contributing to NativeUI! We welcome contributions from the community.

## Development

### Fork this repo

You can fork this repo by clicking the fork button in the top right corner of this page.

### Clone on your local machine

```bash
git clone https://github.com/nativeui-org/ui.git
```

### Navigate to project directory

```bash
cd ui
```

### Create a new Branch

```bash
git checkout -b my-new-branch
```

### Install dependencies

```bash
npm install
```

## Adding a new component

To add a new component to NativeUI, you need to create three files in the `registry/[component-name]/` directory:

1. **Component file** (`[component-name].tsx`) - The actual component implementation
2. **Preview file** (`[component-name].preview.tsx`) - A preview/demo of the component
3. **Usage file** (`[component-name].usage.tsx`) - Usage examples and documentation

### Example structure
registry/
└── my-component/
├── my-component.tsx          # Component implementation
├── my-component.preview.tsx  # Preview/demo
└── my-component.usage.tsx    # Usage examples

### Component guidelines

- Use TypeScript for all components
- Follow the existing code style and patterns
- Include proper TypeScript types and interfaces
- Use Tailwind CSS for styling
- Ensure components are accessible
- Test on both iOS and Android

### Registry configuration

After creating your component files, you need to add the component to the registry:

1. Create a JSON file in `public/r/[component-name].json`
2. Add the component entry to `registry.json`

### Generate component files

Use our script to generate the necessary registry files:

```bash
npm run build:registry
```

## Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

  e.g. `feat(components): add new button component`

## Requests for new components

If you have a request for a new component, please open an issue with the following information:

- Component name
- Description of the component
- Use cases
- Design reference (if available)
- Any specific requirements

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2. Update the README.md with details of changes to the interface, this includes new environment variables, exposed ports, useful file locations and container parameters.
3. Increase the version numbers in any examples files and the README.md to the new version that this Pull Request would represent.
4. You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

## Issues and feature requests

You've found a bug in the source code, a mistake in the documentation or maybe you'd like a new feature? Take a look at [GitHub Discussions](https://github.com/nativeui-org/ui/discussions) to see if it's already being discussed. You can help us by [submitting an issue on GitHub](https://github.com/nativeui-org/ui/issues). Before you create an issue, make sure to search the issue archive -- your issue may have already been addressed!

Please try to create bug reports that are:

- _Reproducible._ Include steps to reproduce the problem.
- _Specific._ Include as much detail as possible: which version, what environment, etc.
- _Unique._ Do not duplicate existing opened issues.
- _Scoped to a Single Bug._ One bug per report.

**Even better: Submit a pull request with a fix or new feature!**

### How to submit a Pull Request

1. Search our repository for open or closed
   [Pull Requests](https://github.com/nativeui-org/ui/pulls)
   that relate to your submission. You don't want to duplicate effort.

2. Fork the project

3. Create your feature branch (`git checkout -b feat/amazing_feature`)

4. Commit your changes (`git commit -m 'feat: add amazing_feature'`)

5. Push to the branch (`git push origin feat/amazing_feature`)

6. [Open a Pull Request](https://github.com/nativeui-org/ui/compare?expand=1)

## License

By contributing your code to the nativeui-org/ui GitHub repository, you agree to license your contribution under the MIT license.