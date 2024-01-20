import urllib.request

url = "https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakeCustomMenuStuff/main/modloadercode.js"  # Replace with the actual URL of the file you want to download
destination_file = "MoreMenuMod.js"  # Replace with the desired local file name

urllib.request.urlretrieve(url, destination_file)

url = "https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakeMouseMode/main/MouseMod.js"  # Replace with the actual URL of the file you want to download
destination_file = "MouseMod.js"  # Replace with the desired local file name

urllib.request.urlretrieve(url, destination_file)

url = "https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakeDeleteStuffMod/main/VisibilityInit.js"  # Replace with the actual URL of the file you want to download
destination_file = "VisibilityMod.js"  # Replace with the desired local file name

urllib.request.urlretrieve(url, destination_file)

mpm_file = open("MorePudding.js", "w", encoding='utf-8')
mpm_combo = open("MorePuddingInit.js", encoding='utf-8')
mm_file = open("MoreMenuMod.js", encoding='utf-8')
pudding = open("PuddingMod.js", encoding='utf-8')
visi_file = open("VisibilityMod.js", encoding='utf-8')


mpm_file.write(pudding.read())
mpm_file.write(mm_file.read())
mpm_file.write(visi_file.read())
mpm_file.write(mpm_combo.read())
pudding.close()
mm_file.close()
mpm_combo.close()
mpm_file.close()
visi_file.close()

mpm_file = open("ChimeraMod.js", "w", encoding='utf-8')
mpm_combo = open("Combo/ChimeraMod.js", encoding='utf-8')
mm_file = open("MoreMenuMod.js", encoding='utf-8')
mouse_file = open("MouseMod.js", encoding='utf-8')
visi_file = open("VisibilityMod.js", encoding='utf-8')

mpm_file.write(mouse_file.read())
mpm_file.write(visi_file.read())
mpm_file.write(mm_file.read())
mpm_file.write(mpm_combo.read())
mouse_file.close()
mm_file.close()
mpm_combo.close()
mpm_file.close()
visi_file.close()
