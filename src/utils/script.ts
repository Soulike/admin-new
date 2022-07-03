export function loadScript(script: string, tagAttr?: { [key: string]: string })
{
    const tag = document.createElement('script');

    if (tagAttr !== undefined)
    {
        Object.keys(tagAttr).forEach(attr =>
        {
            tag.setAttribute(attr, tagAttr[attr]);
        });
    }

    tag.innerHTML = script;
    document.body.appendChild(tag);
}

export async function loadExternalScript(src: string, tagAttr?: { [key: string]: string })
{
    return new Promise<void>((resolve, reject) =>
    {
        const tag = document.createElement('script');

        if (tagAttr !== undefined)
        {
            Object.keys(tagAttr).forEach(attr =>
            {
                tag.setAttribute(attr, tagAttr[attr]);
            });
        }

        tag.onload = () => resolve();
        tag.onerror = () => reject();

        tag.src = src;

        document.body.appendChild(tag);
    });
}