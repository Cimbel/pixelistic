import { awsImage } from '../../const/node-server-config'

export const updateAvatarUrlPath = (avatarPath) => {
    if (!avatarPath || avatarPath.startsWith('http')) {
        return avatarPath
    } else {
        return `${awsImage}/${avatarPath}`
    }
}
