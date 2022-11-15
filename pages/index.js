import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import VideoPage from "./VideoPage";
import { videoService } from "../src/services/videoService";


function HomePage() {
    const service = videoService();
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    const [playlists, setPlaylists] = React.useState({});     // config.playlists

    React.useEffect(() => {
        service.getAllVideos().then((dados) => {
                console.log(dados.data);
                const novasPlaylists = { ...playlists };
                dados.data.forEach((video) => {
                    if (!novasPlaylists[video.playlist]) {
                        novasPlaylists[video.playlist] = [];
                    }
                    novasPlaylists[video.playlist].push(video);
            })
            setPlaylists(novasPlaylists);
        });
    }, []);

    return (
        <>
            <div>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header />
                <Timeline searchValue={valorDoFiltro} playlists={playlists} />
                <Favoritos />
            </div>
        </>
    );
}

export default HomePage

// function Menu() {
//     return (
//         <div>
//             <p>menu</p>
//         </div>
//     )
// }

const StyledHeader = styled.div`
    background-color: ${({ theme }) => theme.backgroundLevel1};
    .user-foto{
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info{
        margin-top:20px;
        display: flex;
        align-items:center;
        width:100%;
        padding: 16px 32px;
        gap:16px;
    }
   .banner{
        width:100%;

    }
`;

function Header() {
    return (
        <StyledHeader>
            <img className="banner" src="https://imgur.com/SK5rCWz.png" alt="Banner" />
            <section className="user-info">
                <img className="user-foto" src={`https://github.com/${config.github}.png`} alt="Foto do perfil" />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline({ searchValue, ...props }) {
    const playlistNames = Object.keys(props.playlists);
    return (
        <StyledTimeline>
            {playlistNames.map(function (playlistName) {
                const videos = props.playlists[playlistName];
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized)

                            }).map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        {/* <a key={video.url} href={"VideoPage"}> */}
                                        <img src={video.thumb} alt="" />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })
                            }
                        </div>
                    </section>

                )
            })}
        </StyledTimeline>
    )
}


const StyledFavoritos = styled.div`

    section{
        width: 100%;
        padding: 0;
        overflow: hidden;
        padding: 32px;
        display: block;
    }
    
    .lista-favoritos {
        display: flex;
        //flex-wrap: wrap;
        //corrigir o wrap
        justify-content: space-between;
    }
    h2 {
        font-size: 16px;
        text-transform: capitalize;
    }
    .favorito-info {
        margin-top:20px;
        align-items:center;
        width:100%;
        padding: 16px 32px;
        gap:16px;
    }
    .favorito-foto {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
    .favorito-nome {
        padding:8px;
    }
`;


function Favoritos() {

    return (
        <StyledFavoritos>
            <section>
                <h2>Favoritos</h2>
                <div className="lista-favoritos">
                    {config.favoritos.map((favorito) => {
                        return (
                            <div key={favorito.github} className="favorito-info">
                                <img className="favorito-foto" src={`https://github.com/${favorito.github}.png`} alt="Foto do perfil" />
                                <p className="favorito-nome">
                                    {favorito.arroba}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </section>
        </StyledFavoritos>
    )
}