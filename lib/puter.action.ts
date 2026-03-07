import puter from "@heyputer/puter.js";
import { getOrCreateHostingConfig, uploadImageToHosting } from "./puter.hosting";
import { isHostedUrl } from "./utils";

export const SignIn = async () => {
    try {
        let test = await puter.auth.signIn();
        return test;

    } catch(e) {
        console.log(e);
    }
}

export const SignOut = () => puter.auth.signOut();

export const GetUser = async () => {
    try {
        return await puter.auth.getUser();
    } catch {
        return null;
    }
}

export const createProject = async ({ item }: CreateProjectParams): Promise<DesignItem | null | undefined> => {
    const projectId = item.id;
    const hosting = await getOrCreateHostingConfig();

    const hostedSource = projectId ? await uploadImageToHosting({ hosting, url: item.sourceImage, projectId, label: 'source' }): null;

    const hostedRender = projectId && item.renderedImage ? await uploadImageToHosting({ hosting, url: item.sourceImage, projectId, label: 'rendered' }): null;

    const resolvedSource = hostedSource?.url || (isHostedUrl(item.sourceImage ? item.sourceImage : '')) ? hostedSource?.url : false;

    if(!resolvedSource) {
        console.warn('Failed to host source image, skipping save.');
        return null;
    }

    const resolvedRender = hostedRender?.url ? hostedRender?.url : item.renderedImage && isHostedUrl(item.renderedImage) ? item.renderedImage : undefined;

    const { sourcePath: _sourcePath, renderedPath: _renderedPath, publicPath: _publicPath, ...rest } = item;

    const payload = { ...rest, sourceImage: resolvedSource, renderedImage: resolvedRender  };

    try {
        return payload;
    } catch(e) {
        console.error('Failed ot save project', e);
        return null;
    }
}