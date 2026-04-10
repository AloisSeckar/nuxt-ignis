<template>
  <div>
    <h1>Ignis Magic Regexp demo</h1>
    <h2>Literal string</h2>
    <div>
      {{ literalString }}
    </div>
    <h2>RegExp value</h2>
    <div>
      {{ semverRegExp }}
    </div>
    <h2>RegExp matching</h2>
    <div>
      {{ matchResult[0] }}
    </div>
    <div>
      {{ matchResult[3] }}
    </div>
  </div>
</template>

<script setup lang="ts">
const literalString = 'magic-regexp 3.2.5.beta.1 just release!'

const semverRegExp = createRegExp(
  oneOrMore(digit)
    .as('major')
    .and('.')
    .and(oneOrMore(digit).as('minor'))
    .and(
      exactly('.')
        .and(oneOrMore(anyOf(wordChar, '.')).groupedAs('patch'))
        .optionally(),
    ),
)

const matchResult = literalString.match(semverRegExp)
</script>
