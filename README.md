# Piano chord charts

Piano/keyboard chord charts SVG library and generator tool.

Proposed API example (coming soon):

```shell
piano-chord-charts --notes C1 E1 G1 Bb1
piano-chord-charts -n C#1 E1 G#1 B1

piano-chord-charts --chord Cmaj7 --voicing drop-2
piano-chord-charts -c Cmaj7 -v drop-2
```

## Problem statement

Creating piano/keyboard chart diagrams for educational purposes can be time consuming, particularly when accounting for all musical keys in combination with different voicing patterns. When done manually it can be repetitive and prone to errors.

The goal of this tool is to automate the process of generating piano/keyboard charts in SVG format and provide a sensible interpretation of common chord symbols and voicing patterns.

## CLI

Once installed, running the `piano-chord-charts` command will emit an empty keybaord chart. If additional options are passed the keyboard diagram will be created accordingly.

## CLI Options

| Flag              | Description                                                                              | Example                   |
| ----------------- | ---------------------------------------------------------------------------------------- | ------------------------- |
| `--outDir`        | The file will be emitted to the specified location.                                      | `--outDir myfolder`       |
| `--format`        | Keyboard diagram format. Values can be `exact` or `compact` (default will be `compact`). | `--format exact`          |
| `--highlightKeys` | Highlights given keys by name, from left to right.                                       | `--highlightKeys "C E G"` |
| `--size`          | Keyboard size (amount of white keys).                                                    | `--size 5`                |
