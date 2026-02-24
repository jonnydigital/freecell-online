# Card Art Prompts for Nano Banana Pro

## System Instructions (paste into AI Studio system instructions box)
```
You are designing a premium set of playing cards for a mobile FreeCell card game. 
Every card must follow these EXACT specifications:

STYLE: Clean, modern flat design. Geometric/minimalist illustrations. NOT photorealistic, NOT cartoon.
BACKGROUND: Off-white (#F5F0E8) card with subtle rounded corners
BORDER: Very thin light gray (#E0D8CC) border
DIMENSIONS: 5:7 aspect ratio (portrait rectangle)
OUTER BACKGROUND: Dark forest green (#0a3d0a)
FONT: Bold, clean sans-serif for rank letters/numbers
COLORS: Red (#C0392B) for hearts/diamonds. Black (#1A1A1A) for spades/clubs.
CORNER INDEX: Large bold rank + suit symbol in top-left. Mirrored rotated 180° in bottom-right. 
Generous spacing from card edge. Must be readable at 40px card width.
CENTER: Suit symbols arranged in standard pip layout for number cards. 
Simplified geometric illustration for face cards.
CONSISTENCY: Every card must look like it belongs to the same deck. Same style, same proportions, same colors.
```

## Face Cards (12 prompts — generate each individually)

### Kings (bold, commanding)
**King of Spades:**
Generate a playing card: King of Spades. Bold "K" and ♠ in top-left corner, mirrored bottom-right. Center: geometric flat-design king figure facing left — angular crown, dark beard, broad shoulders in dark robes. Black and dark gray only. Off-white card on dark green background.

**King of Hearts:**
Generate a playing card: King of Hearts. Bold "K" and ♥ in top-left corner (red), mirrored bottom-right. Center: geometric flat-design king figure — round crown, clean-shaven, regal robes. Red (#C0392B) and dark red only. Off-white card on dark green background.

**King of Diamonds:**
Generate a playing card: King of Diamonds. Bold "K" and ♦ in top-left corner (red), mirrored bottom-right. Center: geometric flat-design king figure holding a diamond scepter — ornate crown, side profile. Red and dark red only. Off-white card on dark green background.

**King of Clubs:**
Generate a playing card: King of Clubs. Bold "K" and ♣ in top-left corner, mirrored bottom-right. Center: geometric flat-design king figure — tall crown, fur-trimmed robes. Black and dark gray only. Off-white card on dark green background.

### Queens (elegant, graceful)
**Queen of Spades:**
Generate a playing card: Queen of Spades. Bold "Q" and ♠ in top-left corner, mirrored bottom-right. Center: geometric flat-design queen figure — tiara, elegant gown, holding a single spade. Black and dark gray only. Off-white card on dark green background.

**Queen of Hearts:**
Generate a playing card: Queen of Hearts. Bold "Q" and ♥ in top-left corner (red), mirrored bottom-right. Center: geometric flat-design queen figure — rose crown, flowing dress, holding a heart. Red (#C0392B) tones. Off-white card on dark green background.

**Queen of Diamonds:**
Generate a playing card: Queen of Diamonds. Bold "Q" and ♦ in top-left corner (red), mirrored bottom-right. Center: geometric flat-design queen figure — diamond tiara, regal pose, holding a diamond. Red tones. Off-white card on dark green background.

**Queen of Clubs:**
Generate a playing card: Queen of Clubs. Bold "Q" and ♣ in top-left corner, mirrored bottom-right. Center: geometric flat-design queen figure — nature crown, elegant stance, holding a club flower. Black and dark gray only. Off-white card on dark green background.

### Jacks (youthful, dynamic)
**Jack of Spades:**
Generate a playing card: Jack of Spades. Bold "J" and ♠ in top-left corner, mirrored bottom-right. Center: geometric flat-design young knight figure — feathered cap, tunic, confident stance. Black and dark gray only. Off-white card on dark green background.

**Jack of Hearts:**
Generate a playing card: Jack of Hearts. Bold "J" and ♥ in top-left corner (red), mirrored bottom-right. Center: geometric flat-design young knight figure — beret, military-style jacket. Red tones. Off-white card on dark green background.

**Jack of Diamonds:**
Generate a playing card: Jack of Diamonds. Bold "J" and ♦ in top-left corner (red), mirrored bottom-right. Center: geometric flat-design young page figure — decorated hat, holding a diamond. Red tones. Off-white card on dark green background.

**Jack of Clubs:**
Generate a playing card: Jack of Clubs. Bold "J" and ♣ in top-left corner, mirrored bottom-right. Center: geometric flat-design young squire figure — cap with club emblem, holding a staff. Black and dark gray only. Off-white card on dark green background.

## Aces (4 prompts — decorative center)

**Ace of Spades:**
Generate a playing card: Ace of Spades. Bold "A" and ♠ in top-left corner, mirrored bottom-right. Center: ONE large ornate spade symbol with decorative flourishes. This is the signature card — make it special. Black on off-white. Dark green background.

**Ace of Hearts:**
Generate a playing card: Ace of Hearts. Bold "A" and ♥ in top-left corner (red), mirrored bottom-right. Center: ONE large ornate heart symbol. Red (#C0392B). Off-white card on dark green background.

**Ace of Diamonds:**
Generate a playing card: Ace of Diamonds. Bold "A" and ♦ in top-left corner (red), mirrored bottom-right. Center: ONE large ornate diamond symbol. Red (#C0392B). Off-white card on dark green background.

**Ace of Clubs:**
Generate a playing card: Ace of Clubs. Bold "A" and ♣ in top-left corner, mirrored bottom-right. Center: ONE large ornate club/trefoil symbol with decorative flourishes. Black on off-white. Dark green background.

## Number Cards (36 cards — use template)

For each number card, use this template:
"Generate a playing card: [RANK] of [SUIT]. Bold '[RANK]' and [SUIT_SYMBOL] in top-left corner [COLOR NOTE], mirrored bottom-right. Center: [RANK] [SUIT_SYMBOL] symbols arranged in standard playing card pip layout. [COLOR] on off-white card. Dark green background."

Example: "Generate a playing card: 7 of Hearts. Bold '7' and ♥ in top-left corner (red), mirrored bottom-right. Center: 7 heart symbols arranged in standard playing card pip layout. Red (#C0392B) on off-white card. Dark green background."

## Card Back (1 prompt)

Generate a playing card back design. Dark navy blue (#1B2A4A) background with an elegant geometric diamond crosshatch pattern in gold (#D4AF37). Thin gold border. Centered subtle crest or monogram. Must look premium and classic. 5:7 aspect ratio.

## Tips for Best Results
1. Generate face cards FIRST — they set the style
2. If a card looks off, regenerate with "Same style as the King of Spades, but..."
3. Lower temperature to 0.7 for more consistency
4. After generating, crop out the green background — we only need the card itself
5. Save at highest resolution available
6. Name files: spadeKing.png, heartQueen.png, club7.png, etc.
