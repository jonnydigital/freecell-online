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
    
    # For making it transparent, let's use the green channel as an inverse alpha mask
    # This works for black (G=0) and red (G=low), while white is G=255.
    r, g, b, a = img.split()
    
    # Invert the green channel to use as alpha
    new_a = g.point(lambda p: 255 - p)
    
    # We want the color to remain what it was but with the new alpha
    # However, to avoid white halos, we can just force the RGB to the dominant color
    # Let's see if we can just use the original RGB but premultiplied? No, just the original RGB is fine if we use the inverted G as alpha.
    
    img.putalpha(new_a)
    
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    img.save(out_path, "PNG")

for name, filename in icons.items():
    in_path = os.path.join(brain_dir, filename)
    out_path = os.path.join(output_dir, f"{name}.png")
    process_icon(in_path, out_path)
    print(f"Processed {name}")

# Process Base Card
base_filename = 'clean_card_base_1772330919675.png'
base_in = os.path.join(brain_dir, base_filename)
base_out = os.path.join(output_dir, 'base.png')

def process_base(img_path, out_path):
    img = Image.open(img_path).convert("RGBA")
    
    # Instead of complex alpha, let's just make pure-ish white transparent
    datas = img.getdata()
    newData = []
    
    for item in datas:
        if item[0] > 245 and item[1] > 245 and item[2] > 245:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    img.save(out_path, "PNG")

process_base(base_in, base_out)
print("Processed base")
