import os
import re
import sys

IMPORT_PREFIX = "$lib/components/svgs/"


def main():
    args = sys.argv
    if len(args) < 2:
        print("Please specify the svgs folder path")
        return
    svgs_path = args[1]

    imports = []
    icons = {}

    for file in os.listdir(svgs_path):
        if not file.endswith("Svg.svelte"):
            continue
        import_path = IMPORT_PREFIX + file

        component_name = file.replace(".svelte", "")

        icon_name = file.replace("Svg.svelte", "")
        icon_name = re.sub(r"(?<!^)(?=[A-Z])", "_", icon_name).lower()

        imports.append(f"import {component_name} from '{import_path}'")
        icons[icon_name] = component_name

    open(svgs_path + "/Icon.svelte", "w+")
    with open(svgs_path + "/Icon.svelte", "a") as f:
        f.write('<script lang="ts">\n')
        for import_path in imports:
            f.write(f"   {import_path}\n")
        f.write("\n")
        f.write("   export let name: string;\n")
        f.write("\n")
        f.write("    const ICONS = {\n")
        for name in icons:
            f.write(f"        {name}: {icons[name]},\n".strip("'"))
        f.write("    }\n")
        f.write("\n")
        f.write(f"    const Icon = ICONS[name];\n")
        f.write(f"</script>\n")
        f.write("\n")
        f.write("{#if Icon}\n")
        f.write("    <Icon />\n")
        f.write("{:else}\n")
        f.write("    <span>Icon not found</span>\n")
        f.write("{/if}")


if __name__ == "__main__":
    main()
