pudding_file = open("PuddingMod.js", "w", encoding='utf-8')
pudding_init = open("PuddingInit.js", encoding='utf-8')
lib_list = [
    "Core",
    "Theme",
    "DistinctVisual",
    "Counter",
    "TimeKeeper",
    "Fruit",
    "TopBar",
    "SnakeColor",
    "SettingsSaver",
    "SpeedInfo",
    "InputDisplay",
    "Timer",
    "BootstrapMenu",
    "CustomPortalPairs"]
for lib in lib_list:
    lib_file = open(f"Libraries/{lib}.js", encoding='utf-8')
    pudding_file.write(lib_file.read())
    lib_file.close()
pudding_file.write(pudding_init.read())
pudding_init.close()
pudding_file.close()
