import os
from PIL import Image

brain_dir = '/Users/jonathanfoye/.gemini/antigravity/brain/187dc8ba-6753-4321-9b9a-a64943b9ab9f'
output_dir = 'public/cards/procedural'

os.makedirs(output_dir, exist_ok=True)

icons = {
    'heart': 'icon_heart_1772330417723.png',
    'spade': 'icon_spade_1772330438690.png',
    'diamond': 'icon_diamond_1772330451860.png',
    'club': 'icon_club_1772330462615.png'
}

def process_icon(img_path, out_path):
    img = Image.open(img_path).convert("RGBA")
    datas = img.getdata()
    
    # Red suit or black suit?
    # Hearts/Diamonds are roughly (220, 0, 0)
    # Spades/Clubs are roughly (0, 0, 0)
    # Background is roughly (255, 255, 255)
    
    newData = []
    for item in datas:
        r, g, b, a = item
        # If it's "white-ish", make it transparent
        if r > 220 and g > 220 and b > 220:
            newData.append((255, 255, 255, 0))
        else:
            # Keep original colors but make sure alpha is full for the graphic
            newData.append((r, g, b, 255))
            
    img.putdata(newData)
    
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    img.save(out_path, "PNG")

for name, filename in icons.items():
    in_path = os.path.join(brain_dir, filename)
    out_path = os.path.join(output_dir, f"{name}.png")
    process_icon(in_path, out_path)
    print(f"Processed {name}")
print("Processed base")
