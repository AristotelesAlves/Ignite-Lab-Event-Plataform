
import { CaretRight, DiscordLogo, FileArrowDown, Image, Lightning } from "phosphor-react";
import { gql, useQuery } from "@apollo/client";


import ReactPlayer from 'react-player'



const GET_LESSON_BY_SLUG_QUERY = gql `
    query GetLessonBySlug ($slug: String) {
    lesson(where: {slug: $slug}) {
        title
        videoId
        description
        teacher {
            avatarURL
            name
            bio
    }
  }
}`

interface VideosProps{
    lessonSlog: string;
}
interface GetLessonBySlugResponse{
    lesson:{
        title: string;
        videoId: string;
        description: string;
        teacher:{
            avatarURL: string;
            name: string;
            bio: string;
        }
    }
}

function Video (props: VideosProps) {

    const { data } = useQuery<GetLessonBySlugResponse>(GET_LESSON_BY_SLUG_QUERY,{
        variables: {
            slug: props.lessonSlog,
        }
    })

    if (!data) {
        return (
            <div className="flex-1">Carregando...</div>
        )
    }

    return(
        <div className="flex-1 max-md:w-full">
            <div className="bg-black flex justify-center">
                <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
                    <ReactPlayer 
                    url={`https://www.youtube.com/watch?v=${data.lesson.videoId}`}
                    width='100%'
                    height='100%' 
                    controls
                    />
                    
                </div>
            </div>
            <div className="p-8 max-w-[1100px] mx-auto">
                <div className="flex items-start gap-16 max-md:flex-col max-md:items-center">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">
                            {data.lesson.title}
                        </h1>
                        <p className="mt-4 text-gray-200 leading-relaxed">
                        {data.lesson.description}
                        </p>

                        <div className="flex items-center gap-4 mt-6">
                            <img 
                            className="h-16 w-16 rounded-full gap-4 mt-6 border-2 border-blue-500"
                            src={data.lesson.teacher.avatarURL}
                            />

                            <div className="leading-relaxed mt-6">
                                <strong className="font-bold text-2xl block">
                                    {data.lesson.teacher.name}
                                </strong>
                                <span className="text-gray-200 text-sm block">
                                    {data.lesson.teacher.bio}
                                </span>
                            </div>
                        </div>

                    </div>
                    <div  className="flex flex-col gap-4 max-md:w-full">
                        <a href="#" className="p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase font gap-2 justify-center hover:bg-green-700 transition-colors">
                            <DiscordLogo size={24}/>Comunidade do Discord
                        </a>
                        <a href="#" className="p-4 text-sm border border-blue-500 text-blue-500 flex items-center rounded font-bold uppercase font gap-2 justify-center hover:bg-blue-500 hover:text-gray-500 transition-colors">
                            <Lightning size={24}/>Comunidade do Discord
                        </a>
                    </div>
                </div>

                <div className="gap-8 mt-20 grid grid-cols-2 max-md:flex max-md:flex-col">
                    <a href="#" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors max-md:h-full">
                        <div className="bg-green-700 h-full p-6 flex items-center">
                            <FileArrowDown size={40}/>
                        </div>
                        <div className="py-6 leading-relaxed">
                            <strong className="text-2xl">
                                Material Complementar
                            </strong>
                            <p className="text-sm text-gray-200 leading-relaxed mt-2">
                                Acesse o material complementar para acelerar o seu desenvolvimento
                            </p>
                        </div>
                        <div className="h-full p-6 fle items-center">
                            <CaretRight size={24}/>
                        </div>
                    </a>

                    <a href="#" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors max-md:h-full">
                        <div className="bg-green-700 h-full p-6 flex items-center">
                            <FileArrowDown size={40}/>
                        </div>
                        <div className="py-6 leading-relaxed">
                            <strong className="text-2xl">
                                Wallpaper
                            </strong>
                            <p className="text-sm text-gray-200 leading-relaxed mt-2 ">
                                Download do wallpaper Personalizado do evento
                            </p>
                        </div>
                        <div className="h-full p-6 fle items-center">
                            <CaretRight size={24}/>
                        </div>
                    </a>
                </div>

                

            </div>
        </div>
    )
}
export default Video;