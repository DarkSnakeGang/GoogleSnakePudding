import urllib.request

url = "https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakeCustomMenuStuff/main/modloadercode.js"  # Replace with the actual URL of the file you want to download
destination_file = "MoreMenuMod.js"  # Replace with the desired local file name

urllib.request.urlretrieve(url, destination_file)

mpm_file = open("MorePudding.js", "w", encoding='utf-8')
mpm_combo = open("MorePuddingInit.js", encoding='utf-8')
mm_file = open("MoreMenuMod.js", encoding='utf-8')
pudding = open("PuddingMod.js", encoding='utf-8')

mpm_file.write(pudding.read())
mpm_file.write(mm_file.read())
mpm_file.write(mpm_combo.read())
pudding.close()
mm_file.close()
mpm_combo.close()
mpm_file.close()
