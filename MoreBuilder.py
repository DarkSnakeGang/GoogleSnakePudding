import urllib.request
import os

if not os.path.exists("MoreMenuMod.js"):
    url = "https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakeCustomMenuStuff/main/modloadercode.js"
    urllib.request.urlretrieve(url, "MoreMenuMod.js")

if not os.path.exists("VisibilityMod.js"):
    url = "https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakeDeleteStuffMod/main/VisibilityInit.js"
    urllib.request.urlretrieve(url, "VisibilityMod.js")

mpm_file = open("MorePudding.js", "w", encoding='utf-8')
mpm_combo = open("MorePuddingInit.js", encoding='utf-8')
mm_file = open("MoreMenuMod.js", encoding='utf-8')
pudding = open("PuddingMod.js", encoding='utf-8')
visi_file = open("VisibilityMod.js", encoding='utf-8')
pause_file = open("PauseGameMod.js", encoding='utf-8')


mpm_file.write(pudding.read())
mpm_file.write(mm_file.read())
mpm_file.write(visi_file.read())
mpm_file.write(mpm_combo.read())
pudding.close()
mm_file.close()
mpm_combo.close()
mpm_file.close()
visi_file.close()
pause_file.close()
