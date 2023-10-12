import json, os

def append_lines_to_dict(all_lines: list[str]):

    entries = []
    entry_tracker: int = -1

    for l in all_lines:
        if l.startswith('new entry '):
            entry_tracker += 1
            entries.append({})
            l = l.replace('new entry ','')
            l = l.replace("\"","")
            entries[entry_tracker]['name'] = l
        elif l.startswith('type '):
            l = l.replace('\"','')
            key, value = l.split(" ", maxsplit=1)
            entries[entry_tracker][key] = value
        elif l.startswith('using '):
            l = l.replace('\"','')
            key, value = l.split(" ", maxsplit=1)
            entries[entry_tracker][key] = value
        elif l.startswith('data '):
            l = l.replace('data ','')
            key, value = l.split("\" \"", maxsplit=1)
            key = key.replace("\"","")
            value = value.replace("\"","")
            entries[entry_tracker][key] = value

    return entries

def convert() :
    destdir = 'E:\Program Files\lslib\LSLib\Gustav\Public\GustavDev\Stats\Generated\Data'
    files = [ f for f in os.listdir(destdir) if os.path.isfile(os.path.join(destdir,f)) ]
    for f in files:
        fileData = open('json_output.json')
        data = json.load(fileData)
        fileData.close()
        if(f.endswith('.txt')):
            # print(f)
            file = open(os.path.join(destdir,f), "r")
            content = file.read()
            splitcontent = content.splitlines()
            data = data + append_lines_to_dict(splitcontent)
            with open("json_output.json", 'w') as fout:
                json.dump(data, fout, indent=4)
        fout.close()

convert()