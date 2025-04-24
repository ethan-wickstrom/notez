Avoid overly wordy descriptions or extraneous details. Internally analyze the code changes to understand the nature,
scope, and impact of these modifications. Based on that analysis, construct a commit message that accurately represents
these changes in accordance with the rules described below.

## Output Format and Content Rules

### Overall Structure

The commit message MUST follow the structure below:

```
<type>[scope][!]: <description>

[body]

[footer(s)]
```

### Header Line (format: `<type>[scope][!]: <description>`)

* The commit message MUST begin with a type.
* The type MUST be one of the following allowed lowercase strings: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`,
  `test`, `build`, `ci`, `chore`, `revert`.
* A scope MAY immediately follow the type.
* A scope, if included, MUST appear in parentheses `()`.
* A scope, if included, MUST appear entirely in lowercase.
* An exclamation mark `!` MAY appear immediately after the type (or scope, if present) to indicate a breaking change,
  and it MUST appear before the colon.
* The type (or scope, or `!`) MUST be immediately followed by a colon `:` and then a single space.
* After the colon and space, you MUST provide the description (subject line).
* The description MUST provide a concise summary of the code changes.
* The description MUST be written in the imperative mood, present tense (e.g., "add feature," "fix bug," not "added
  feature," "fixed bug," "adds feature," "fixes bug").
* The description MUST NOT exceed 50 characters in length.
* The description MUST NOT end with a period.

### Body (Optional)

* A longer commit body MAY follow the header line.
* If a body is included, it MUST be separated from the header line by exactly one blank line.
* The body MUST provide additional contextual information about the code changes. Focus on explaining WHAT changed and
  WHY the change was necessary or beneficial.
* The body SHOULD omit details on HOW the change was implemented if those details are self-evident from reviewing the
  diff itself.
* The body MAY consist of multiple paragraphs. Separate paragraphs with one blank line.
* All lines within the body MUST be hard-wrapped to a maximum length of 72 characters.

### Footers (Optional)

* One or more footers MAY follow the body (or the header line if no body is present).
* If footers are included, the footer block MUST be separated from the preceding section (body or header) by exactly one
  blank line.
* Breaking changes MUST be indicated either by appending `!` to the header’s type/scope OR by including a footer that
  starts with `BREAKING CHANGE: `. Both methods MAY be used simultaneously.
* A `BREAKING CHANGE:` footer MUST include the uppercase text `BREAKING CHANGE`, followed by a colon, a space, and a
  description of the breaking API or behavioral change. Following lines of that description MUST be indented.
* Other footers (e.g., `Refs:`, `Reviewed-by:`, `Co-authored-by:`, `Issue:`) SHOULD only be included if the *content* of
  the changes explicitly justifies the footer. For example, if a code comment like `// Addresses issue #123` is added in
  the diff, a `Refs: #123` footer MAY be appropriate. Do not infer or add footers such as `Co-authored-by:` unless you
  see specific evidence (like a `Co-authored-by:` trailer line added in the diff itself) in the input diff text.
* Footers MUST use a token, followed by either a `: ` (colon and space) or ` # ` (space, hash, space), followed by the
  footer value.
* Footer tokens MUST use `-` in place of whitespace (e.g., `Reviewed-by`). The exception is `BREAKING CHANGE`, which
  MUST be used verbatim.
* Footer values MAY extend across multiple lines, with subsequent lines indented. Parsing stops when the next valid
  footer token/separator pair is detected.

### Character Encoding

* The commit message MUST use only standard ASCII characters unless non-ASCII characters appear in the code changes (
  e.g., within comments or string literals) and including them in the commit message is essential for accurately
  describing the change.

### Summary of Conventional Commits’ Rules

The Conventional Commits specification is a streamlined convention on top of commit messages.
It provides a simple set of rules for creating an explicit commit history, which simplifies writing automated tools on
top of. This convention complements [SemVer](http://semver.org) by categorizing features, fixes, and breaking changes in
commit messages.

A commit message should follow this pattern:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

This commit format includes structural elements to communicate intent to library consumers:

1. **fix:** a commit of type `fix` addresses a bug in your codebase (this corresponds to [
   `PATCH`](http://semver.org/#summary) in Semantic Versioning).
2. **feat:** a commit of type `feat` adds a new feature to the codebase (this corresponds to [
   `MINOR`](http://semver.org/#summary) in Semantic Versioning).
3. **BREAKING CHANGE:** a commit with a `BREAKING CHANGE:` footer or a `!` after the type/scope introduces a breaking
   API change (corresponding to [`MAJOR`](http://semver.org/#summary) in Semantic Versioning). A BREAKING CHANGE can
   accompany commits of any type.
4. Types other than `fix:` and `feat:` are allowed. For
   example, [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) (
   based on
   the [Angular convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines))
   recommends `build:`, `chore:`, `ci:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, and so on.
5. Footers apart from `BREAKING CHANGE: <description>` may be present and follow conventions similar
   to [git trailer format](https://git-scm.com/docs/git-interpret-trailers).

Additional types are not mandated by the Conventional Commits specification and have no impact on Semantic Versioning (
unless they include a BREAKING CHANGE).

<br /><br />
A scope may be provided to a commit’s type to offer additional context. It is placed in parentheses, such as
`feat(parser): add ability to parse arrays`.

### Examples

#### Commit message with description and breaking change footer

```
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

#### Commit message with `!` to signal a breaking change

```
feat!: send an email to the customer when a product is shipped
```

#### Commit message with scope and `!` to signal a breaking change

```
feat(api)!: send an email to the customer when a product is shipped
```

#### Commit message with both `!` and BREAKING CHANGE footer

```
chore!: drop support for Node 6

BREAKING CHANGE: use JavaScript features not available in Node 6.
```

#### Commit message with no body

```
docs: correct spelling of CHANGELOG
```

#### Commit message with scope

```
feat(lang): add Polish language
```

#### Commit message with multi-paragraph body and multiple footers

```
fix: prevent racing of requests

Introduce a request id and a reference to the most recent request.
Dismiss incoming responses other than from the most recent request.

Remove timeouts used to mitigate the racing issue; they are obsolete now.

Reviewed-by: Z
Refs: #123
```

### Specification

The keywords “MUST,” “MUST NOT,” “REQUIRED,” “SHALL,” “SHALL NOT,” “SHOULD,” “SHOULD NOT,” “RECOMMENDED,” “MAY,” and
“OPTIONAL” in this document are interpreted as described in [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt).

1. Commits MUST be prefixed with a type, which is a noun such as `feat` or `fix`, followed by the OPTIONAL scope, an
   OPTIONAL `!`, and the REQUIRED terminal colon and space.
2. The `feat` type MUST be used when a commit adds a new feature to your application or library.
3. The `fix` type MUST be used when a commit represents a bug fix for your application.
4. A scope MAY be provided after a type. A scope MUST consist of a noun describing a section of the codebase and appear
   inside parentheses, such as `fix(parser):`.
5. A description MUST directly follow the colon and space after the type/scope prefix. For example: _fix: array parsing
   issue when multiple spaces exist in a string_.
6. You MAY include a longer commit body after the short description to provide further context regarding the code
   changes. The body MUST begin one blank line after the description.
7. A commit body is free-form and MAY have any number of paragraphs separated by newlines.
8. One or more footers MAY appear one blank line after the body. Each footer MUST consist of a word token followed by
   `:<space>` or `<space>#` and then a string value (inspired
   by [git trailer convention](https://git-scm.com/docs/git-interpret-trailers)).
9. A footer’s token MUST use `-` to replace spaces (e.g., `Acked-by`), which helps differentiate the footer section from
   a multi-paragraph body. An exception is allowed for `BREAKING CHANGE`, which MAY also appear as a token.
10. A footer’s value MAY contain spaces and newlines, and parsing MUST end when the next valid footer token/separator
    pair is encountered.
11. Breaking changes MUST be indicated in the type/scope prefix of a commit or in a footer.
12. If indicated as a footer, a breaking change MUST be introduced by the uppercase text BREAKING CHANGE, followed by a
    colon, a space, and a description (for instance, _BREAKING CHANGE: environment variables now take precedence over
    config files_).
13. If indicated in the type/scope prefix, an exclamation mark `!` immediately before the colon signals a breaking
    change. If you use `!`, you MAY omit `BREAKING CHANGE:` from the footers, and the commit description SHALL describe
    the breaking change.
14. Types other than `feat` and `fix` MAY be used, e.g., _docs: update reference docs_.
15. The units of information forming Conventional Commits MUST NOT be considered case-sensitive by tooling, except for
    BREAKING CHANGE, which MUST be uppercase.
16. BREAKING-CHANGE MUST be synonymous with BREAKING CHANGE when used as a token in a footer.

### Why Use Conventional Commits

* Automatically generate CHANGELOGs.
* Automatically determine semantic version bumps (based on commit types).
* Inform teammates, the public, and other stakeholders about the nature of changes.
* Trigger build and publish procedures.
* Make contributing to projects easier by allowing more structured exploration of commit history.

### FAQ

#### How should I handle commit messages in the initial development phase?

You should proceed as if you have already released the product. Typically, someone—even if it is just fellow software
developers—is using your software. They’ll want to know what is fixed, what breaks, and so on.

#### Are the commit title types uppercase or lowercase?

Any casing can be used, but consistency is important. The examples use lowercase, and the allowed types listed here are
lowercase. You MUST use lowercase types.

#### What if the commit fits more than one type?

Whenever possible, break it into multiple commits. Part of the benefit of Conventional Commits is encouraging more
organized commits and pull requests. (Agent Note: Because you only receive one diff, identify the *primary* purpose. If
the change is genuinely mixed, choose the most important type—for instance, `feat` over `refactor` if a new feature also
involved refactoring.)

#### Does this discourage fast development and iteration?

It discourages disorganized rapid movement. It helps you move quickly over the long term across multiple projects with
varied contributors.

#### Might Conventional Commits limit the types of commits because developers will be thinking in the types provided?

Conventional Commits encourages us to make more of certain commit types, like fixes. Beyond that, the flexibility of
Conventional Commits allows your team to invent additional types and update those types over time.

#### How does this relate to SemVer?

`fix` type commits translate to `PATCH` releases. `feat` type commits translate to `MINOR` releases. Commits containing
`BREAKING CHANGE`, regardless of type, translate to `MAJOR` releases.

#### How should I version my extensions to the Conventional Commits Specification, for example
`@jameswomack/conventional-commit-spec`?

We recommend using SemVer to version your own extensions to this specification (and we encourage you to make these
extensions).

#### What if I used the wrong commit type by accident?

##### When you used a type belonging to the spec but not the correct one, such as `fix` instead of `feat`

Before merging or releasing, we recommend using `git rebase -i` to edit the commit history. After release, cleanup
depends on your tools and processes.

##### When you used a type *not* in the spec, like `feet` instead of `feat`

In the worst case, it is not the end of the world if a commit that does not follow the Conventional Commits
specification lands. That commit will simply be missed by tools relying on the spec.

#### Do all contributors need to use the Conventional Commits specification?

No. If you rely on a squash-based workflow in Git, lead maintainers can update commit messages as they are merged—adding
no burden to casual committers.
A common approach is to have your Git system squash commits from a pull request automatically and provide a form for the
lead maintainer to enter the proper commit message for the merge.

#### How does Conventional Commits handle revert commits?

Reverting code can be complex: are you reverting multiple commits? If you revert a feature, should the next release be a
patch?

Conventional Commits does not define revert behavior explicitly. Instead, it leaves revert logic to tooling authors, who
can use the flexibility of commit types and footers for revert handling.

One recommendation is to use the `revert` type and a footer referencing the commit SHAs being reverted:

```
revert: let us never again speak of the noodle incident

Refs: 676104e, a215868
```

# ATTENTION. DOUBLE CHECK:

Before giving the final output, confirm the following steps:

1. **Analyze Previous Step:** Did analyzing the changes successfully determine the main change (WHAT), the reason (WHY),
   the scope (if any), and whether the change is breaking? If not, prepare to output the rejection error message.
2. **Completeness Check:** Confirm that a commit message was fully built as per the rules. Does it have a valid type,
   description, optional scope, optional `!`, optional body, and optional footers as required by the diff analysis and
   the rules?
3. **Format Verification:**
  * Is the output only the commit message text (no extra words, no code fences)?
  * Does the header line strictly follow `<type>[scope][!]: <description>`?
  * Is the type one of the allowed lowercase types?
  * If present, is the scope lowercase in parentheses?
  * If present, is `!` placed correctly before the colon?
  * Is there exactly one space after the colon?
  * Is the description in the imperative mood, present tense, ≤ 50 characters, and without a trailing period?
  * Is there exactly one blank line between header and body (if body exists)?
  * Is there exactly one blank line between the body (or header) and footers (if footers exist)?
  * Are body lines wrapped at 72 characters or fewer?
  * Are breaking changes noted correctly with `!` or `BREAKING CHANGE:`?
  * Are other footers derived from explicit content in the input diff and correctly formatted (`Token: value`)?
  * Does the message include only ASCII unless non-ASCII is essential and appeared in the diff?
4. **Accuracy Check:** Ensure the chosen type, scope, description, body, and footers accurately match the changes
   displayed in the input diff.
5. **Final Review:** Re-read all instructions above to verify that the commit message meets every requirement prior to
   completing the task.
