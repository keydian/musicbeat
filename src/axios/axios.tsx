import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import store, { logout, reset_token } from "../redux/redux";
import { CreateCollection, LoginCreds, RegisterCreds } from "../types/types";

const url = "https://ipm2122appwesteurope55310.azurewebsites.net/rest/";
//const url = "http://localhost:8080/rest/"

axios.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    let token = store.getState().token;
    if (token) {
      config.headers = {
        "authorization": token
      }
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  function (config: AxiosResponse) {
    if (
      store.getState().token !== "" &&
      !config.config.url?.includes("logout")
    ) {
      store.dispatch(reset_token(config.headers["authorization"]));
      sessionStorage.setItem("token", config.headers["authorization"]);
    }
    return config;
  },
  function (err) {
    if (err.response.status === 401) {
      sessionStorage.removeItem("token");
      store.dispatch(logout());
    }
    return Promise.reject(err);
  }
);

export async function loginUser(creds: LoginCreds) {
  return await axios.put(url.concat("users"), creds)
}

export async function logoutUser() {
  return await axios.delete(url.concat("users/logout"))
}
export async function registerUser(creds: RegisterCreds) {
  return await axios.post(url.concat("users"), creds);
}

export async function getUser(username : string) {
  return await axios.get(url.concat(`users/${username}`))
}

export async function getUserCollections(
  username : string,
  pageNum : number,
  pageSize : number
) {
  return await axios.get(url.concat(`collections/search`), {
    params: {
      username : username,
      pageNum : pageNum,
      size : pageSize
    }
  })
}

export async function uploadPicture(
  image: File
) {
    let formData = new FormData();
    formData.append("file", image);
    return await axios.post(url.concat(`media`), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
}

export async function createCollection(cc : CreateCollection) {
  return await axios.post(url.concat('collections'), cc)
}

export async function getFullCollection(collectionid: string) {
  return await axios.get(url.concat(`collections/${collectionid}/full`))
}

export async function deleteSongFromCol(colid: string, songid : string) {
  return await axios.delete(url.concat(`collections/${colid}/songs/${songid}`))
}

export async function addSongToCol(colid: string, songid : string) {
  return await axios.put(url.concat(`collections/${colid}/songs/${songid}`))
}

export async function getSong(songid : string) {
  return await axios.get(url.concat(`songs/${songid}`))
}

export async function getAlbum(albumid : string) {
  return await axios.get(url.concat(`albums/${albumid}`))
}

export async function getAlbumByName(albumname : string) {
  return await axios.get(url.concat(`albums/name/${albumname}`))
}
export async function searchAlbumSongs(
  by : string,
  val : string,
  pageNum: number,
  size: number
){
  return await axios.get(url.concat(`albums/search`),{
    params: {
      by : by,
      val: val,
      pageNum : pageNum,
      size : size
    }})
}


export async function getAlbumSongs(albumName : string) {
  return await axios.get(url.concat(`albums/${albumName}/songs`))
}

export async function searchJams(
  pageNum : number,
  pageSize : number
) {
  return await axios.get(url.concat(`jams/search`), {
    params: {
      pageNum : pageNum,
      size : pageSize
    }
  })
}

export async function getHomepage(){
    return await axios.get(url.concat(`songs/homepage`))
}

export async function getJam(jamid : string) {
  return await axios.get(url.concat(`jams/${jamid}`))
}

export async function getJamSongs(jamid : string) {
  return await axios.get(url.concat(`jams/${jamid}/songs`))
}

export async function addSongToJam(jamid: string, songid : string) {
  return await axios.put(url.concat(`jams/${jamid}/add/${songid}`))
}

export async function removeSonFromJam(jamid: string, songid : string) {
  return await axios.delete(url.concat(`jams/${jamid}/del/${songid}`))
}

export async function joinJam(jamid : string) {
  return await axios.put(url.concat(`jams/${jamid}`))
}

export async function leaveJam(jamid : string) {
  return await axios.delete(url.concat(`jams/${jamid}`))
}

export async function getJamSuggested(jamid : string) {
  return await axios.get(url.concat(`jams/suggested/${jamid}`))
}

export async function searchSongs(
  by : string,
  val: string,
  pageNum : number,
  pageSize : number
) {
  return await axios.get(url.concat(`songs/search`), {
    params: {
      by : by,
      val: val,
      pageNum : pageNum,
      size : pageSize
    }
  })
}
