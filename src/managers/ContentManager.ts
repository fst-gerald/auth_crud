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

  export const createContent = async (content: Content) => {
    const createdContent = await Axios.client.post('/api/contents', content, {
      headers: {
        'Authorization': 'Bearer ' + await Auth.getCurrentToken()
      }
    });

    return createdContent.data;
  }

  export const updateContent = async (content: Content) => {
    const updatedContent = await Axios.client.put(`/api/contents/${content.id}`, content, {
      headers: {
        'Authorization': 'Bearer ' + await Auth.getCurrentToken()
      }
    })

    return updatedContent.data;
  }

  export const deleteContent = async (content: Content) => {
    await Axios.client.delete(`/api/contents/${content.id}`, {
      headers: {
        'Authorization': 'Bearer ' + await Auth.getCurrentToken()
      }
    });
  }
}
