import os
import re

IMPORT_PREFIX = "$lib/components/svgs/"


def main():
    imports = []
    icons = {}

    for file in os.listdir():
        if not file.endswith("Svg.svelte"):
            return

        import_path = IMPORT_PREFIX + file

        name = file.replace("Svg.svelte", "")
        name = re.sub(r"(?<!^)(?=[A-Z])", "_", name).lower()
        print(name)


if __name__ == "__main__":
    main()
