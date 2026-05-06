# Tarot Data

## Files

- `tarot-cards.json`: Imported base card meanings from LookFate TarotDB, cleaned to 78 cards.
- `tarot-meanings-full.json`: Local expanded meaning database generated from this app's 78-card deck.

## `tarot-meanings-full.json` Structure

Each card has:

- `id`, `name`, `nameEn`, `num`
- `arcana`, `suit`, `element`, `planet`
- `image`
- `keywords`
- `summary`
- `upright`
- `reversed`

Both `upright` and `reversed` include:

- `title`
- `meaning`
- `keywords`
- `aspects`

Aspect keys:

- `love`
- `career`
- `money`
- `relationship`
- `health`
- `advice`
- `warning`
- `past`
- `present`
- `future`
- `situation`
- `challenge`
- `suggestion`
