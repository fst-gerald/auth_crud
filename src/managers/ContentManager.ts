import { Axios } from "../base/Axios";
import { Content } from '../models/Content';
import { Auth } from '../base/Auth';

export module ContentManager {
  export const getAllContents = async () => {
    const contentList = await Axios.client.get<Content[]>('/api/contents', {
      headers: {
        'Authorization': 'Bearer ' + await Auth.getCurrentToken()
      }
    });

    return contentList.data;
  }

  export const getContent = async (contentId: number) => {
    const selectedContent = await Axios.client.get<Content>(`/api/contents/${contentId}`, {
      headers: {
        'Authorization': 'Bearer ' + await Auth.getCurrentToken()
      }
    })
      
    return selectedContent.data;
  }

  export const deleteContent = async (content: Content) => {
    await Axios.client.delete(`/api/contents/${content.id}`, {
      headers: {
        'Authorization': 'Bearer ' + await Auth.getCurrentToken()
      }
    });
  }
}
