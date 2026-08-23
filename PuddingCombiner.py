pudding_file = open("PuddingMod.js", "w", encoding='utf-8')
pudding_init = open("PuddingInit.js", encoding='utf-8')
init_content = pudding_init.read()
pudding_init.close()

init_marker = "////////////////////////////////////////////////////////////////////\n//RUNCODEBEFORE"
if init_marker in init_content:
    init_header, init_body = init_content.split(init_marker, 1)
    pudding_file.write(init_header)
else:
    init_body = init_content

lib_list = [
    "Core",
    "Theme",
    "DistinctVisual",
    "Counter",
    "ModeRegistry",
    "TimeKeeper",
    "Fruit",
    "GraphicsMix",
    "TopBar",
    "SnakeColor",
    "SettingsSaver",
    "SpeedInfo",
    "InputDisplay",
    "Timer",
    "SplitPanel",
    "Backup",
    "BootstrapMenu",
    "ResetKey",
    "RenderDelayFix",
    "CustomBowl",
    ]
for lib in lib_list:
    lib_file = open(f"Libraries/{lib}.js", encoding='utf-8')
    pudding_file.write(lib_file.read())
    lib_file.close()

if init_marker in init_content:
    pudding_file.write(init_marker + init_body)
else:
    pudding_file.write(init_body)
pudding_file.close()
