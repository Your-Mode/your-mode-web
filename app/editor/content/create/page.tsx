"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/src/shared/components/ui/button"
import { Input } from "@/src/shared/components/ui/input"
import { Label } from "@/src/shared/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/components/ui/card"
import { Badge } from "@/src/shared/components/ui/badge"
import { Slider } from "@/src/shared/components/ui/slider"
import {
  ImageIcon,
  Plus,
  AlignLeft,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  List,
  GripVertical,
  Trash2,
  Calendar,
  User,
  Minus,
  Code,
  AlertCircle,
  Table,
  Video,
  MousePointer,
  Space,
  Columns,
  Grid3X3,
  Bold,
  Italic,
  Underline,
  ArrowLeft,
  Save,
  Eye,
  Send,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import styled from "@emotion/styled"
import { Checkbox } from "@/src/shared/components/ui/checkbox"

const MainContainer = styled.div`
  min-height: calc(100vh - 4rem);
  background-color: #fafafa;
  padding: 2rem 0;
`

const MainContent = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (min-width: 640px) {
    padding: 0 2rem;
  }
`

const PageHeader = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const HeaderRight = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: white;
  border: 1px solid #e5e7eb;
  color: #666;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f9fafb;
    border-color: #ff3e6c;
    color: #ff3e6c;
  }
`

const HeaderContent = styled.div``

const PageTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
  
  @media (max-width: 640px) {
    font-size: 2rem;
  }
`

const PageDescription = styled.p`
  color: #666;
  font-size: 1rem;
  max-width: 600px;
`

const ContentLayout = styled.div<{ showPreview: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const SettingsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const EditorContentLayout = styled.div<{ showPreview: boolean }>`
  display: grid;
  grid-template-columns: ${(props) => (props.showPreview ? "1fr 1fr" : "1fr")};
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

const SidebarSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: sticky;
  top: 6rem;
  height: fit-content;
  max-height: calc(100vh - 8rem);
  overflow-y: auto;
  z-index: 10;
  
  @media (max-width: 1024px) {
    position: static;
    max-height: none;
    order: 2;
  }
`

const EditorSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const PreviewSection = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
  gap: 1rem;
  
  @media (max-width: 1024px) {
    display: none;
  }
`

const EditorCard = styled(Card)`
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  min-height: 600px;
  background: white;
`

const PreviewCard = styled(Card)`
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 6rem;
  max-height: calc(100vh - 8rem);
  overflow-y: auto;
  background: white;
`

const PreviewHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  background: #f8f9fa;
  border-radius: 8px 8px 0 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const BannerImageSection = styled.div`
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 2rem;
`

const BannerImageBlock = styled.div`
  position: relative;
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  
  &:hover {
    border-color: #ff3e6c;
    background: linear-gradient(135deg, #fff5f7 0%, #ffe0e6 100%);
  }
  
  &.has-image {
    border: none;
    padding: 0;
    background: transparent;
  }
`

const BannerPreview = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

const BannerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 1;
  }
`

const TitleInput = styled(Input)`
  font-size: 2rem;
  font-weight: 700;
  border: none;
  padding: 1rem 0;
  background: transparent;
  
  &:focus {
    outline: none;
    box-shadow: none;
  }
  
  &::placeholder {
    color: #ccc;
  }
`

const BlocksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 400px;
`

const Block = styled.div`
  position: relative;
  group: block;
  
  &:hover .block-controls {
    opacity: 1;
  }
`

const BlockControls = styled.div`
  position: absolute;
  left: -60px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 10;
  
  @media (max-width: 768px) {
    left: -40px;
  }
`

const ControlButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f5f5f5;
    border-color: #ff3e6c;
    color: #ff3e6c;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const BlockContent = styled.div`
  padding: 0.5rem 0;
  border: 2px solid transparent;
  border-radius: 4px;
  transition: border-color 0.2s ease;
  
  &:hover {
    border-color: #f0f0f0;
  }
  
  &:focus-within {
    border-color: #ff3e6c;
  }
`

const AutoResizeTextarea = styled.textarea`
  border: none;
  padding: 0.75rem;
  resize: none;
  min-height: 2.5rem;
  background: transparent;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  line-height: 1.6;
  overflow: hidden;
  white-space: pre-wrap;
  
  &:focus {
    outline: none;
    box-shadow: none;
  }
  
  &::placeholder {
    color: #999;
  }
`

const BlockInput = styled(Input)`
  border: none;
  padding: 0.75rem;
  background: transparent;
  font-weight: 600;
  
  &:focus {
    outline: none;
    box-shadow: none;
  }
  
  &::placeholder {
    color: #999;
  }
`

const ImageBlock = styled.div`
  position: relative;
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #ff3e6c;
    background-color: #fff5f7;
  }
  
  &.has-image {
    border: none;
    padding: 0;
    background: transparent;
  }
`

const ImagePreview = styled.div<{ width: number }>`
  position: relative;
  width: ${(props) => props.width}%;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
  transition: width 0.3s ease;
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`

const ImageControls = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s ease;
  
  ${ImageBlock}:hover & {
    opacity: 1;
  }
`

const ImageControlButton = styled.button`
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 4px;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }
`

const ImageSizeControls = styled.div`
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 1;
  transition: opacity 0.2s ease;
  min-width: 200px;
  z-index: 20;
  cursor: default;
  
  ${ImageBlock}:hover & {
    opacity: 1;
  }
  
  .slider-root {
    cursor: pointer !important;
  }
`

const AddBlockButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  border: 2px dashed #ddd;
  border-radius: 8px;
  background: transparent;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #ff3e6c;
    color: #ff3e6c;
    background-color: #fff5f7;
  }
`

const BlockTypeMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 20;
  padding: 0.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.25rem;
`

const BlockTypeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-align: left;
  
  &:hover {
    background-color: #f5f5f5;
  }
`

const FormCard = styled(Card)`
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  background: white;
`

const PreviewContent = styled.div`
  line-height: 1.8;
  color: #333;
  
  h1 {
    font-size: 2rem;
    font-weight: 600;
    margin: 1rem 0;
    color: #333;
  }
  
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 1rem 0;
    color: #333;
  }
  
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 1rem 0;
    color: #333;
  }
  
  p {
    margin: 1rem 0;
    white-space: pre-wrap;
  }
  
  blockquote {
    font-style: italic;
    border-left: 4px solid #ff3e6c;
    padding-left: 1rem;
    background-color: #f9f9f9;
    padding: 1rem;
    margin: 1rem 0;
    white-space: pre-wrap;
  }
  
  img {
    border-radius: 8px;
    margin: 1.5rem 0;
  }
`

const PreviewBanner = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: 0;
  }
`

const PreviewMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
  font-size: 0.875rem;
  color: #666;
`

const ToggleButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>`
  background-color: ${(props) => (props.active ? "#ff3e6c" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#666")};
  border: 1px solid ${(props) => (props.active ? "#ff3e6c" : "#ddd")};
  
  &:hover {
    background-color: ${(props) => (props.active ? "#e6356a" : "#f5f5f5")};
  }
`

const TextFormatToolbar = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
  background: #f9f9f9;
  border-radius: 8px 8px 0 0;
`

const FormatButton = styled.button<{ active?: boolean }>`
  padding: 0.25rem 0.5rem;
  border: 1px solid #ddd;
  background: ${(props) => (props.active ? "#ff3e6c" : "white")};
  color: ${(props) => (props.active ? "white" : "#333")};
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  
  &:hover {
    background: ${(props) => (props.active ? "#e6356a" : "#f5f5f5")};
  }
`

// 이미지 스크롤 컨테이너 스타일 추가
const ImageScrollContainer = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  width: 100%;
  margin: 0 auto;
  flex-wrap: nowrap;
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }
`

// 개별 이미지 컨테이너 스타일 추가
const SingleImageContainer = styled.div`
  position: relative;
  flex: 0 0 auto;
  margin-bottom: 1rem;
`

interface ContentBlock {
  id: string
  type:
    | "paragraph"
    | "heading1"
    | "heading2"
    | "heading3"
    | "image"
    | "image-gallery" // 새로 추가
    | "quote"
    | "list"
    | "divider"
    | "code"
    | "callout"
    | "table"
    | "video"
    | "button"
    | "spacer"
    | "columns"
    | "gallery"
  content: string
  // 단일 이미지용
  imageUrl?: string
  imageWidth?: number
  // 다중 이미지용
  images?: Array<{
    url: string
    width: number
  }>
  // 새로운 속성들
  calloutType?: "info" | "warning" | "success" | "error"
  buttonText?: string
  buttonUrl?: string
  tableData?: string[][]
  videoUrl?: string
  spacerHeight?: number
  columnLeft?: string
  columnRight?: string
  galleryImages?: string[]
  textFormat?: {
    bold?: boolean
    italic?: boolean
    underline?: boolean
    color?: string
    backgroundColor?: string
    link?: string
  }
}

export default function EditorContentCreatePage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [bannerImage, setBannerImage] = useState<string | null>(null)
  const [blocks, setBlocks] = useState<ContentBlock[]>([{ id: "1", type: "paragraph", content: "" }])
  const [showBlockMenu, setShowBlockMenu] = useState<string | null>(null)
  const [showFullPreview, setShowFullPreview] = useState(false)
  const [showPreview, setShowPreview] = useState(true)

  const [formData, setFormData] = useState({
    userId: "",
    bodyType: [] as string[], // 배열로 변경
    category: [] as string[], // 배열로 변경
    isPublished: false,
    isFeatured: false,
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const bannerInputRef = useRef<HTMLInputElement>(null)
  const [currentImageBlockId, setCurrentImageBlockId] = useState<string | null>(null)

  const bodyTypes = [
    { id: "wave", label: "웨이브" },
    { id: "straight", label: "스트레이트" },
    { id: "natural", label: "내추럴" },
    { id: "all", label: "모든 체형" },
  ]

  const categories = [
    { id: "styling", label: "스타일링 가이드" },
    { id: "trend", label: "트렌드 분석" },
    { id: "tips", label: "패션 팁" },
    { id: "seasonal", label: "시즌 컬렉션" },
    { id: "item", label: "아이템 추천" },
  ]

  const blockTypes = [
    { type: "paragraph", label: "본문", icon: AlignLeft },
    { type: "heading1", label: "제목 1", icon: Heading1 },
    { type: "heading2", label: "제목 2", icon: Heading2 },
    { type: "heading3", label: "제목 3", icon: Heading3 },
    { type: "image", label: "이미지", icon: ImageIcon },
    { type: "image-gallery", label: "이미지 갤러리", icon: Grid3X3 },
    { type: "quote", label: "인용문", icon: Quote },
    { type: "list", label: "목록", icon: List },
    { type: "divider", label: "구분선", icon: Minus },
    { type: "code", label: "코드", icon: Code },
    { type: "callout", label: "강조 박스", icon: AlertCircle },
    { type: "table", label: "표", icon: Table },
    { type: "video", label: "비디오", icon: Video },
    { type: "button", label: "버튼", icon: MousePointer },
    { type: "spacer", label: "여백", icon: Space },
    { type: "columns", label: "2단 레이아웃", icon: Columns },
    { type: "gallery", label: "갤러리", icon: Grid3X3 },
  ]

  // Auto-resize textarea
  const autoResize = (element: HTMLTextAreaElement) => {
    element.style.height = "auto"
    element.style.height = element.scrollHeight + "px"
  }

  const addBlock = (type: ContentBlock["type"], afterId?: string) => {
    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type,
      content: "",
      ...(type === "image" && { imageWidth: 100 }),
    }

    if (afterId) {
      const index = blocks.findIndex((block) => block.id === afterId)
      const newBlocks = [...blocks]
      newBlocks.splice(index + 1, 0, newBlock)
      setBlocks(newBlocks)
    } else {
      setBlocks([...blocks, newBlock])
    }

    setShowBlockMenu(null)
  }

  const updateBlock = (id: string, content: string) => {
    setBlocks(blocks.map((block) => (block.id === id ? { ...block, content } : block)))
  }

  const deleteBlock = (id: string) => {
    if (blocks.length > 1) {
      setBlocks(blocks.filter((block) => block.id !== id))
    }
  }

  const moveBlock = (id: string, direction: "up" | "down") => {
    const index = blocks.findIndex((block) => block.id === id)
    if ((direction === "up" && index > 0) || (direction === "down" && index < blocks.length - 1)) {
      const newBlocks = [...blocks]
      const targetIndex = direction === "up" ? index - 1 : index + 1
      ;[newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]]
      setBlocks(newBlocks)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && currentImageBlockId) {
      const currentBlock = blocks.find((block) => block.id === currentImageBlockId)

      if (currentBlock?.type === "image") {
        // 단일 이미지 블록 처리
        const file = files[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = (e) => {
            setBlocks(
              blocks.map((block) =>
                block.id === currentImageBlockId ? { ...block, imageUrl: e.target?.result as string } : block,
              ),
            )
          }
          reader.readAsDataURL(file)
        }
      } else if (currentBlock?.type === "image-gallery") {
        // 이미지 갤러리 블록 처리 (기존 로직)
        const fileArray = Array.from(files)
        fileArray.forEach((file) => {
          const reader = new FileReader()
          reader.onload = (e) => {
            setBlocks((prevBlocks) =>
              prevBlocks.map((block) => {
                if (block.id === currentImageBlockId && block.type === "image-gallery") {
                  const newImages = [...(block.images || [])]
                  newImages.push({
                    url: e.target?.result as string,
                    width: 100,
                  })
                  return { ...block, images: newImages }
                }
                return block
              }),
            )
          }
          reader.readAsDataURL(file)
        })
      }

      event.target.value = ""
    }
  }

  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setBannerImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleFormat = (blockId: string, format: "bold" | "italic" | "underline") => {
    setBlocks(
      blocks.map((block) => {
        if (block.id === blockId) {
          const currentFormat = block.textFormat?.[format] || false
          return {
            ...block,
            textFormat: {
              ...block.textFormat,
              [format]: !currentFormat,
            },
          }
        }
        return block
      }),
    )
  }

  const updateTextFormat = (blockId: string, property: string, value: string) => {
    setBlocks(
      blocks.map((block) => {
        if (block.id === blockId) {
          return {
            ...block,
            textFormat: {
              ...block.textFormat,
              [property]: value,
            },
          }
        }
        return block
      }),
    )
  }

  const addLink = (blockId: string) => {
    const url = prompt("링크 URL을 입력하세요:")
    if (url) {
      const linkText = prompt("링크 텍스트를 입력하세요:")
      if (linkText) {
        const currentBlock = blocks.find((b) => b.id === blockId)
        if (currentBlock) {
          const newContent = currentBlock.content + `[${linkText}](${url})`
          updateBlock(blockId, newContent)
        }
      }
    }
  }

  const processTextWithLinks = (text: string) => {
    const linkRegex = /\[([^\]]+)\]$$([^)]+)$$/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index))
      }
      parts.push(
        <a
          key={match.index}
          href={match[2]}
          style={{ color: "#ff3e6c", textDecoration: "underline" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          {match[1]}
        </a>,
      )
      lastIndex = match.index + match[0].length
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }

    return parts.length > 1 ? parts : text
  }

  const getYouTubeEmbedUrl = (url: string) => {
    // YouTube URL에서 비디오 ID 추출
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)

    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`
    }

    // YouTube가 아닌 경우 원본 URL 반환
    return url
  }

  const renderBlock = (block: ContentBlock, index: number) => {
    return (
      <Block key={block.id}>
        <BlockControls className="block-controls">
          <ControlButton onClick={() => moveBlock(block.id, "up")} disabled={index === 0}>
            <GripVertical size={14} />
          </ControlButton>
          <ControlButton onClick={() => deleteBlock(block.id)} disabled={blocks.length === 1}>
            <Trash2 size={14} />
          </ControlButton>
        </BlockControls>

        <BlockContent>
          {/* 단일 이미지 블록 */}
          {block.type === "image" && (
            <div>
              {block.imageUrl ? (
                <ImageBlock className="has-image">
                  <ImagePreview width={block.imageWidth || 100}>
                    <img src={block.imageUrl || "/placeholder.svg"} alt="Single image" />
                    <ImageControls>
                      <ImageControlButton
                        onClick={() => {
                          setCurrentImageBlockId(block.id)
                          fileInputRef.current?.click()
                        }}
                      >
                        <ImageIcon size={14} />
                      </ImageControlButton>
                      <ImageControlButton
                        onClick={() => {
                          setBlocks(blocks.map((b) => (b.id === block.id ? { ...b, imageUrl: undefined } : b)))
                        }}
                      >
                        ×
                      </ImageControlButton>
                    </ImageControls>
                    <ImageSizeControls onClick={(e) => e.stopPropagation()}>
                      <span style={{ fontSize: "0.75rem", minWidth: "35px" }}>크기</span>
                      <Slider
                        value={[block.imageWidth || 100]}
                        onValueChange={(value) =>
                          setBlocks(blocks.map((b) => (b.id === block.id ? { ...b, imageWidth: value[0] } : b)))
                        }
                        max={100}
                        min={30}
                        step={10}
                        className="flex-1"
                        style={{ cursor: "pointer" }}
                      />
                      <span style={{ fontSize: "0.75rem", minWidth: "35px" }}>{block.imageWidth || 100}%</span>
                    </ImageSizeControls>
                  </ImagePreview>
                </ImageBlock>
              ) : (
                <ImageBlock
                  onClick={() => {
                    setCurrentImageBlockId(block.id)
                    fileInputRef.current?.click()
                  }}
                >
                  <ImageIcon size={48} color="#ccc" style={{ marginBottom: "1rem" }} />
                  <p>클릭하여 이미지를 추가하세요</p>
                </ImageBlock>
              )}
            </div>
          )}
          {/* 이미지 갤러리 블록 */}
          {block.type === "image-gallery" && (
            <div>
              <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <Button
                  size="sm"
                  onClick={() => {
                    setCurrentImageBlockId(block.id)
                    fileInputRef.current?.click()
                  }}
                >
                  이미지 추가
                </Button>
              </div>

              {block.images && block.images.length > 0 ? (
                <div
                  style={{
                    width: "100%",
                    height: "200px", // 고정 높이 설정
                    overflowX: "auto",
                    overflowY: "hidden",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    padding: "1rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      height: "100%",
                      alignItems: "center",
                    }}
                  >
                    {block.images.map((image, index) => (
                      <div
                        key={index}
                        style={{
                          position: "relative",
                          flex: "0 0 auto",
                          height: "150px",
                        }}
                      >
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={`Gallery image ${index + 1}`}
                          style={{
                            height: "150px",
                            width: "auto",
                            objectFit: "cover",
                            borderRadius: "8px",
                            border: "1px solid #ddd",
                          }}
                        />
                        <button
                          onClick={() => {
                            const newImages = [...(block.images || [])]
                            newImages.splice(index, 1)
                            setBlocks(blocks.map((b) => (b.id === block.id ? { ...b, images: newImages } : b)))
                          }}
                          style={{
                            position: "absolute",
                            top: "0.5rem",
                            right: "0.5rem",
                            background: "rgba(0,0,0,0.7)",
                            color: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: "24px",
                            height: "24px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "16px",
                            lineHeight: "1",
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    border: "2px dashed #ddd",
                    borderRadius: "8px",
                    padding: "3rem 2rem",
                    textAlign: "center",
                    cursor: "pointer",
                    background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                  }}
                  onClick={() => {
                    setCurrentImageBlockId(block.id)
                    fileInputRef.current?.click()
                  }}
                >
                  <Grid3X3 size={48} color="#ccc" style={{ marginBottom: "1rem" }} />
                  <p>클릭하여 이미지들을 추가하세요</p>
                  <p style={{ fontSize: "0.875rem", color: "#666" }}>여러 이미지를 선택할 수 있습니다</p>
                </div>
              )}
            </div>
          )}

          {/* 구분선 블록 */}
          {block.type === "divider" && (
            <div style={{ padding: "1rem 0", textAlign: "center" }}>
              <hr style={{ border: "none", borderTop: "2px solid #e0e0e0", margin: "0" }} />
            </div>
          )}

          {/* 코드 블록 */}
          {block.type === "code" && (
            <div style={{ background: "#f5f5f5", borderRadius: "8px", overflow: "hidden" }}>
              <div style={{ background: "#e0e0e0", padding: "0.5rem 1rem", fontSize: "0.875rem", color: "#666" }}>
                코드
              </div>
              <AutoResizeTextarea
                placeholder="코드를 입력하세요..."
                value={block.content}
                onChange={(e) => {
                  updateBlock(block.id, e.target.value)
                  autoResize(e.target)
                }}
                onInput={(e) => autoResize(e.target as HTMLTextAreaElement)}
                style={{
                  fontFamily: "monospace",
                  background: "#f5f5f5",
                  border: "none",
                  padding: "1rem",
                }}
              />
            </div>
          )}

          {/* 강조 박스 블록 */}
          {block.type === "callout" && (
            <div>
              <div style={{ marginBottom: "0.5rem" }}>
                <select
                  value={block.calloutType || "info"}
                  onChange={(e) =>
                    setBlocks(blocks.map((b) => (b.id === block.id ? { ...b, calloutType: e.target.value as any } : b)))
                  }
                  style={{ padding: "0.25rem", borderRadius: "4px", border: "1px solid #ddd" }}
                >
                  <option value="info">정보</option>
                  <option value="warning">경고</option>
                  <option value="success">성공</option>
                  <option value="error">오류</option>
                </select>
              </div>
              <div
                style={{
                  padding: "1rem",
                  borderRadius: "8px",
                  border: "1px solid",
                  borderColor:
                    block.calloutType === "warning"
                      ? "#f59e0b"
                      : block.calloutType === "success"
                        ? "#10b981"
                        : block.calloutType === "error"
                          ? "#ef4444"
                          : "#3b82f6",
                  backgroundColor:
                    block.calloutType === "warning"
                      ? "#fef3c7"
                      : block.calloutType === "success"
                        ? "#d1fae5"
                        : block.calloutType === "error"
                          ? "#fee2e2"
                          : "#dbeafe",
                }}
              >
                <AutoResizeTextarea
                  placeholder="강조할 내용을 입력하세요..."
                  value={block.content}
                  onChange={(e) => {
                    updateBlock(block.id, e.target.value)
                    autoResize(e.target)
                  }}
                  onInput={(e) => autoResize(e.target as HTMLTextAreaElement)}
                  style={{ background: "transparent", border: "none", width: "100%" }}
                />
              </div>
            </div>
          )}

          {/* 비디오 블록 */}
          {block.type === "video" && (
            <div>
              <Input
                placeholder="YouTube URL 또는 비디오 URL을 입력하세요"
                value={block.videoUrl || ""}
                onChange={(e) =>
                  setBlocks(blocks.map((b) => (b.id === block.id ? { ...b, videoUrl: e.target.value } : b)))
                }
                style={{ marginBottom: "1rem" }}
              />
              {block.videoUrl && (
                <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
                  <iframe
                    src={
                      block.videoUrl.includes("youtube.com") || block.videoUrl.includes("youtu.be")
                        ? getYouTubeEmbedUrl(block.videoUrl)
                        : block.videoUrl
                    }
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          )}

          {/* 버튼 블록 */}
          {block.type === "button" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <Input
                placeholder="버튼 텍스트"
                value={block.buttonText || ""}
                onChange={(e) =>
                  setBlocks(blocks.map((b) => (b.id === block.id ? { ...b, buttonText: e.target.value } : b)))
                }
              />
              <Input
                placeholder="링크 URL"
                value={block.buttonUrl || ""}
                onChange={(e) =>
                  setBlocks(blocks.map((b) => (b.id === block.id ? { ...b, buttonUrl: e.target.value } : b)))
                }
              />
              {block.buttonText && <Button style={{ alignSelf: "flex-start" }}>{block.buttonText}</Button>}
            </div>
          )}

          {/* 여백 블록 */}
          {block.type === "spacer" && (
            <div>
              <Label>여백 높이: {block.spacerHeight || 50}px</Label>
              <Slider
                value={[block.spacerHeight || 50]}
                onChange={(value) =>
                  setBlocks(blocks.map((b) => (b.id === block.id ? { ...b, spacerHeight: value[0] } : b)))
                }
                max={200}
                min={20}
                step={10}
                style={{ marginTop: "0.5rem" }}
              />
              <div
                style={{
                  height: `${block.spacerHeight || 50}px`,
                  background:
                    "repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 10px, transparent 10px, transparent 20px)",
                  border: "1px dashed #ccc",
                  borderRadius: "4px",
                  marginTop: "0.5rem",
                }}
              />
            </div>
          )}

          {/* 2단 레이아웃 블록 */}
          {block.type === "columns" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <Label>왼쪽 컬럼</Label>
                <AutoResizeTextarea
                  placeholder="왼쪽 내용..."
                  value={block.columnLeft || ""}
                  onChange={(e) => {
                    setBlocks(blocks.map((b) => (b.id === block.id ? { ...b, columnLeft: e.target.value } : b)))
                    autoResize(e.target)
                  }}
                  onInput={(e) => autoResize(e.target as HTMLTextAreaElement)}
                  style={{ border: "1px solid #ddd", borderRadius: "4px", padding: "0.5rem" }}
                />
              </div>
              <div>
                <Label>오른쪽 컬럼</Label>
                <AutoResizeTextarea
                  placeholder="오른쪽 내용..."
                  value={block.columnRight || ""}
                  onChange={(e) => {
                    setBlocks(blocks.map((b) => (b.id === block.id ? { ...b, columnRight: e.target.value } : b)))
                    autoResize(e.target)
                  }}
                  onInput={(e) => autoResize(e.target as HTMLTextAreaElement)}
                  style={{ border: "1px solid #ddd", borderRadius: "4px", padding: "0.5rem" }}
                />
              </div>
            </div>
          )}

          {/* 헤딩 블록 */}
          {block.type.startsWith("heading") && (
            <BlockInput
              placeholder={`${blockTypes.find((t) => t.type === block.type)?.label} 입력...`}
              value={block.content}
              onChange={(e) => updateBlock(block.id, e.target.value)}
              style={{
                fontSize: block.type === "heading1" ? "2rem" : block.type === "heading2" ? "1.5rem" : "1.25rem",
                fontWeight: "600",
              }}
            />
          )}

          {/* 텍스트 블록 (paragraph, quote, list) */}
          {(block.type === "paragraph" || block.type === "quote" || block.type === "list") && (
            <>
              <TextFormatToolbar>
                <FormatButton active={block.textFormat?.bold} onClick={() => toggleFormat(block.id, "bold")}>
                  <Bold size={14} />
                </FormatButton>
                <FormatButton active={block.textFormat?.italic} onClick={() => toggleFormat(block.id, "italic")}>
                  <Italic size={14} />
                </FormatButton>
                <FormatButton active={block.textFormat?.underline} onClick={() => toggleFormat(block.id, "underline")}>
                  <Underline size={14} />
                </FormatButton>
                <FormatButton onClick={() => addLink(block.id)}>링크</FormatButton>
                <input
                  type="color"
                  value={block.textFormat?.color || "#000000"}
                  onChange={(e) => updateTextFormat(block.id, "color", e.target.value)}
                  style={{ width: "30px", height: "30px", border: "none", borderRadius: "4px" }}
                />
              </TextFormatToolbar>
              <AutoResizeTextarea
                placeholder={`${blockTypes.find((t) => t.type === block.type)?.label} 입력...`}
                value={block.content}
                onChange={(e) => {
                  updateBlock(block.id, e.target.value)
                  autoResize(e.target)
                }}
                onInput={(e) => autoResize(e.target as HTMLTextAreaElement)}
                style={{
                  fontStyle: block.type === "quote" ? "italic" : "normal",
                  borderLeft: block.type === "quote" ? "4px solid #ff3e6c" : "none",
                  paddingLeft: block.type === "quote" ? "1rem" : "0.75rem",
                  fontWeight: block.textFormat?.bold ? "bold" : "normal",
                  textDecoration: block.textFormat?.underline ? "underline" : "none",
                  color: block.textFormat?.color || "#000",
                }}
              />
            </>
          )}
          {/* 표 블록 */}
          {block.type === "table" && (
            <div>
              <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem" }}>
                <Button
                  size="sm"
                  onClick={() => {
                    const newTableData = block.tableData || [
                      ["", ""],
                      ["", ""],
                    ]
                    newTableData.push(new Array(newTableData[0].length).fill(""))
                    setBlocks(blocks.map((b) => (b.id === block.id ? { ...b, tableData: newTableData } : b)))
                  }}
                >
                  행 추가
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    const newTableData = block.tableData || [
                      ["", ""],
                      ["", ""],
                    ]
                    if (newTableData.length > 1) {
                      newTableData.pop()
                      setBlocks(blocks.map((b) => (b.id === block.id ? { ...b, tableData: newTableData } : b)))
                    }
                  }}
                >
                  행 삭제
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    const newTableData = block.tableData || [
                      ["", ""],
                      ["", ""],
                    ]
                    newTableData.forEach((row) => row.push(""))
                    setBlocks(blocks.map((b) => (b.id === block.id ? { ...b, tableData: newTableData } : b)))
                  }}
                >
                  열 추가
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    const newTableData = block.tableData || [
                      ["", ""],
                      ["", ""],
                    ]
                    if (newTableData[0] && newTableData[0].length > 1) {
                      newTableData.forEach((row) => row.pop())
                      setBlocks(blocks.map((b) => (b.id === block.id ? { ...b, tableData: newTableData } : b)))
                    }
                  }}
                >
                  열 삭제
                </Button>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd" }}>
                <tbody>
                  {(
                    block.tableData || [
                      ["", ""],
                      ["", ""],
                    ]
                  ).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                          <Input
                            value={cell}
                            onChange={(e) => {
                              const newTableData = [
                                ...(block.tableData || [
                                  ["", ""],
                                  ["", ""],
                                ]),
                              ]
                              newTableData[rowIndex][cellIndex] = e.target.value
                              setBlocks(blocks.map((b) => (b.id === block.id ? { ...b, tableData: newTableData } : b)))
                            }}
                            style={{ border: "none", background: "transparent" }}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* 갤러리 블록 */}
          {block.type === "gallery" && (
            <div>
              <div style={{ marginBottom: "1rem" }}>
                <Button
                  size="sm"
                  onClick={() => {
                    const input = document.createElement("input")
                    input.type = "file"
                    input.accept = "image/*"
                    input.multiple = true
                    input.onChange = (e) => {
                      const files = (e.target as HTMLInputElement).files
                      if (files) {
                        Array.from(files).forEach((file) => {
                          const reader = new FileReader()
                          reader.onload = (event) => {
                            const newImages = [...(block.galleryImages || [])]
                            newImages.push(event.target?.result as string)
                            setBlocks(blocks.map((b) => (b.id === block.id ? { ...b, galleryImages: newImages } : b)))
                          }
                          reader.readAsDataURL(file)
                        })
                      }
                    }
                    input.click()
                  }}
                >
                  이미지 추가
                </Button>
              </div>
              <div
                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}
              >
                {(block.galleryImages || []).map((image, index) => (
                  <div key={index} style={{ position: "relative" }}>
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Gallery ${index + 1}`}
                      style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
                    />
                    <button
                      onClick={() => {
                        const newImages = [...(block.galleryImages || [])]
                        newImages.splice(index, 1)
                        setBlocks(blocks.map((b) => (b.id === block.id ? { ...b, galleryImages: newImages } : b)))
                      }}
                      style={{
                        position: "absolute",
                        top: "0.5rem",
                        right: "0.5rem",
                        background: "rgba(0,0,0,0.7)",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "24px",
                        height: "24px",
                        cursor: "pointer",
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
                {(!block.galleryImages || block.galleryImages.length === 0) && (
                  <div
                    style={{
                      border: "2px dashed #ddd",
                      borderRadius: "8px",
                      padding: "2rem",
                      textAlign: "center",
                      color: "#666",
                    }}
                  >
                    이미지를 추가해보세요
                  </div>
                )}
              </div>
            </div>
          )}
        </BlockContent>

        {/* 블록 사이에 추가 버튼 */}
        <div style={{ position: "relative", margin: "0.5rem 0" }}>
          <AddBlockButton onClick={() => setShowBlockMenu(block.id)}>
            <Plus size={16} />
            블록 추가
          </AddBlockButton>
          {showBlockMenu === block.id && (
            <BlockTypeMenu>
              {blockTypes.map((blockType) => {
                const Icon = blockType.icon
                return (
                  <BlockTypeButton
                    key={blockType.type}
                    onClick={() => addBlock(blockType.type as ContentBlock["type"], block.id)}
                  >
                    <Icon size={16} />
                    <span style={{ fontSize: "0.875rem" }}>{blockType.label}</span>
                  </BlockTypeButton>
                )
              })}
            </BlockTypeMenu>
          )}
        </div>
      </Block>
    )
  }

  const renderPreviewContent = () => {
    return (
      <PreviewContent>
        {/* 배너 이미지 */}
        {bannerImage && (
          <PreviewBanner>
            <img src={bannerImage || "/placeholder.svg"} alt="Banner" />
          </PreviewBanner>
        )}

        {/* 메타 정보 */}
        <PreviewMeta>
          <div className="flex items-center gap-2">
            {formData.userId && <Badge variant="outline">@{formData.userId}</Badge>}
            {formData.bodyType.map((typeId) => {
              const type = bodyTypes.find((t) => t.id === typeId)
              return type ? (
                <Badge key={typeId} variant="outline">
                  {type.label}
                </Badge>
              ) : null
            })}
            {formData.category.map((catId) => {
              const cat = categories.find((c) => c.id === catId)
              return cat ? (
                <Badge key={catId} variant="outline">
                  {cat.label}
                </Badge>
              ) : null
            })}
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <User size={14} />
              <span>에디터</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </PreviewMeta>

        {/* 제목 */}
        <h1 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "2rem", color: "#333" }}>
          {title || "제목을 입력하세요"}
        </h1>

        {/* 컨텐츠 블록들 */}
        {blocks.map((block) => {
          // 단일 이미지 블록 미리보기
          if (block.type === "image" && block.imageUrl) {
            return (
              <div key={block.id} style={{ margin: "2rem 0", textAlign: "center" }}>
                <img
                  src={block.imageUrl || "/placeholder.svg"}
                  alt="Single image"
                  style={{
                    width: `${block.imageWidth || 100}%`,
                    height: "auto",
                    borderRadius: "8px",
                    maxWidth: "100%",
                  }}
                />
              </div>
            )
          }

          // 이미지 갤러리 블록 미리보기
          if (block.type === "image-gallery" && block.images && block.images.length > 0) {
            return (
              <div key={block.id} style={{ margin: "2rem 0" }}>
                <div
                  style={{
                    width: "100%",
                    height: "300px", // 고정 높이
                    overflowX: "auto",
                    overflowY: "hidden",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    padding: "1rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      height: "100%",
                      alignItems: "center",
                    }}
                  >
                    {block.images.map((image, index) => (
                      <img
                        key={index}
                        src={image.url || "/placeholder.svg"}
                        alt={`Gallery image ${index + 1}`}
                        style={{
                          height: "250px",
                          width: "auto",
                          objectFit: "cover",
                          borderRadius: "8px",
                          flex: "0 0 auto",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )
          }

          // 구분선 블록
          if (block.type === "divider") {
            return (
              <div key={block.id} style={{ margin: "2rem 0" }}>
                <hr style={{ border: "none", borderTop: "2px solid #e0e0e0" }} />
              </div>
            )
          }

          // 코드 블록
          if (block.type === "code" && block.content) {
            return (
              <div key={block.id} style={{ margin: "2rem 0" }}>
                <pre
                  style={{
                    background: "#f5f5f5",
                    padding: "1rem",
                    borderRadius: "8px",
                    overflow: "auto",
                    fontFamily: "monospace",
                    fontSize: "0.875rem",
                  }}
                >
                  <code>{block.content}</code>
                </pre>
              </div>
            )
          }

          // 강조 박스 블록
          if (block.type === "callout" && block.content) {
            return (
              <div
                key={block.id}
                style={{
                  margin: "2rem 0",
                  padding: "1rem",
                  borderRadius: "8px",
                  border: "1px solid",
                  borderColor:
                    block.calloutType === "warning"
                      ? "#f59e0b"
                      : block.calloutType === "success"
                        ? "#10b981"
                        : block.calloutType === "error"
                          ? "#ef4444"
                          : "#3b82f6",
                  backgroundColor:
                    block.calloutType === "warning"
                      ? "#fef3c7"
                      : block.calloutType === "success"
                        ? "#d1fae5"
                        : block.calloutType === "error"
                          ? "#fee2e2"
                          : "#dbeafe",
                }}
              >
                <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{block.content}</p>
              </div>
            )
          }

          // 비디오 블록
          if (block.type === "video" && block.videoUrl) {
            return (
              <div key={block.id} style={{ margin: "2rem 0" }}>
                <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
                  <iframe
                    src={
                      block.videoUrl.includes("youtube.com") || block.videoUrl.includes("youtu.be")
                        ? getYouTubeEmbedUrl(block.videoUrl)
                        : block.videoUrl
                    }
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              </div>
            )
          }

          // 버튼 블록
          if (block.type === "button" && block.buttonText) {
            return (
              <div key={block.id} style={{ margin: "2rem 0", textAlign: "center" }}>
                <a
                  href={block.buttonUrl || "#"}
                  style={{
                    display: "inline-block",
                    padding: "0.75rem 1.5rem",
                    background: "#ff3e6c",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "8px",
                    fontWeight: "600",
                  }}
                >
                  {block.buttonText}
                </a>
              </div>
            )
          }

          // 여백 블록
          if (block.type === "spacer") {
            return <div key={block.id} style={{ height: `${block.spacerHeight || 50}px` }} />
          }

          // 2단 레이아웃 블록
          if (block.type === "columns" && (block.columnLeft || block.columnRight)) {
            return (
              <div
                key={block.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "2rem",
                  margin: "2rem 0",
                }}
              >
                <div style={{ whiteSpace: "pre-wrap" }}>{block.columnLeft}</div>
                <div style={{ whiteSpace: "pre-wrap" }}>{block.columnRight}</div>
              </div>
            )
          }

          // 표 블록 미리보기
          if (block.type === "table" && block.tableData && block.tableData.length > 0) {
            return (
              <div key={block.id} style={{ margin: "2rem 0", overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd" }}>
                  <tbody>
                    {block.tableData.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            style={{
                              border: "1px solid #ddd",
                              padding: "0.75rem",
                              backgroundColor: rowIndex === 0 ? "#f8f9fa" : "white",
                              fontWeight: rowIndex === 0 ? "600" : "normal",
                            }}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }

          // 갤러리 블록 미리보기
          if (block.type === "gallery" && block.galleryImages && block.galleryImages.length > 0) {
            return (
              <div key={block.id} style={{ margin: "2rem 0" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "1rem",
                  }}
                >
                  {block.galleryImages.map((image, index) => (
                    <img
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`Gallery ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  ))}
                </div>
              </div>
            )
          }

          // 텍스트 블록들
          if (block.content) {
            const textStyle = {
              margin: "1rem 0",
              whiteSpace: "pre-wrap" as const,
              fontWeight: block.textFormat?.bold ? "bold" : "normal",
              fontStyle: block.type === "quote" || block.textFormat?.italic ? "italic" : "normal",
              textDecoration: block.textFormat?.underline ? "underline" : "none",
              color: block.textFormat?.color || "#333",
            }

            if (block.type === "heading1") {
              return (
                <h1 key={block.id} style={{ ...textStyle, fontSize: "2rem", fontWeight: "600" }}>
                  {block.content}
                </h1>
              )
            } else if (block.type === "heading2") {
              return (
                <h2 key={block.id} style={{ ...textStyle, fontSize: "1.5rem", fontWeight: "600" }}>
                  {block.content}
                </h2>
              )
            } else if (block.type === "heading3") {
              return (
                <h3 key={block.id} style={{ ...textStyle, fontSize: "1.25rem", fontWeight: "600" }}>
                  {block.content}
                </h3>
              )
            } else if (block.type === "quote") {
              return (
                <blockquote
                  key={block.id}
                  style={{
                    ...textStyle,
                    borderLeft: "4px solid #ff3e6c",
                    paddingLeft: "1rem",
                    backgroundColor: "#f9f9f9",
                    padding: "1rem",
                    borderRadius: "4px",
                  }}
                >
                  {processTextWithLinks(block.content)}
                </blockquote>
              )
            } else if (block.type === "list") {
              return (
                <div key={block.id} style={textStyle}>
                  {block.content.split("\n").map((line, i) => (
                    <div key={i} style={{ marginBottom: "0.25rem" }}>
                      {processTextWithLinks(line)}
                    </div>
                  ))}
                </div>
              )
            } else {
              return (
                <p key={block.id} style={textStyle}>
                  {processTextWithLinks(block.content)}
                </p>
              )
            }
          }

          return null
        })}
      </PreviewContent>
    )
  }

  const handleSave = () => {
    const content = { title, bannerImage, blocks }
    console.log("Saving content:", content)
    alert("컨텐츠가 저장되었습니다.")
  }

  const handlePublish = () => {
    const content = { title, bannerImage, blocks, ...formData }
    console.log("Publishing content:", content)
    alert("컨텐츠가 발행되었습니다.")
    router.push("/editor/content")
  }

  const handleAutoGenerate = () => {
    // 샘플 제목 설정
    setTitle("2024 겨울 스타일링 가이드: 따뜻하면서도 세련된 룩 완성하기")

    // 샘플 배너 이미지 설정 (placeholder)
    setBannerImage("/placeholder.svg?height=400&width=800")

    // 샘플 블록들 설정
    const sampleBlocks: ContentBlock[] = [
      {
        id: "auto-1",
        type: "heading1",
        content: "겨울 스타일링의 핵심 포인트",
      },
      {
        id: "auto-2",
        type: "paragraph",
        content:
          "추운 겨울철에도 스타일을 포기할 수 없다면, 이번 가이드를 주목해보세요. 따뜻함과 세련됨을 동시에 잡을 수 있는 실용적인 팁들을 소개합니다.",
      },
      {
        id: "auto-3",
        type: "heading2",
        content: "레이어링의 기술",
      },
      {
        id: "auto-4",
        type: "paragraph",
        content:
          "겨울 스타일링의 핵심은 바로 레이어링입니다. 얇은 소재부터 두꺼운 소재까지 단계적으로 겹쳐 입으면서도 부피감을 최소화하는 것이 중요합니다.",
      },
      {
        id: "auto-5",
        type: "image",
        content: "",
        images: [{ url: "/placeholder.svg?height=300&width=500", width: 80 }],
      },
      {
        id: "auto-6",
        type: "heading2",
        content: "컬러 매칭 가이드",
      },
      {
        id: "auto-7",
        type: "paragraph",
        content: "겨울철에는 다크 톤이 주를 이루지만, 포인트 컬러를 활용하면 더욱 생동감 있는 룩을 연출할 수 있습니다.",
      },
      {
        id: "auto-8",
        type: "quote",
        content: "패션은 자신을 표현하는 언어입니다. 겨울이라고 해서 그 언어를 포기할 필요는 없어요.",
      },
      {
        id: "auto-9",
        type: "heading2",
        content: "필수 아이템 체크리스트",
      },
      {
        id: "auto-10",
        type: "list",
        content:
          "• 베이직 니트 (3-4가지 컬러)\n• 롱 코트 (캐멀, 블랙 추천)\n• 부츠 (앵클부츠, 롱부츠)\n• 머플러 및 스카프\n• 베레모 또는 비니",
      },
    ]

    setBlocks(sampleBlocks)

    // 폼 데이터도 샘플로 설정
    setFormData({
      userId: "fashion_editor",
      bodyType: ["all"],
      category: ["styling"],
      isPublished: false,
      isFeatured: false,
    })

    alert("초안이 자동으로 작성되었습니다! 내용을 수정하여 완성해보세요.")
  }

  return (
    <MainContainer>
      <MainContent>
        <PageHeader>
          <HeaderLeft>
            <BackButton href="/editor/content">
              <ArrowLeft size={20} />
            </BackButton>
            <HeaderContent>
              <PageTitle>새 컨텐츠 작성</PageTitle>
              <PageDescription>
                블록 기반 에디터로 풍부한 컨텐츠를 작성해보세요. 실시간 미리보기를 확인하며 작성할 수 있습니다.
              </PageDescription>
            </HeaderContent>
          </HeaderLeft>
          <HeaderRight></HeaderRight>
        </PageHeader>

        {!showFullPreview ? (
          <ContentLayout showPreview={showPreview}>
            {/* 배너 이미지 섹션을 최상단으로 이동 */}
            <FormCard>
              <CardContent style={{ padding: "2rem" }}>
                <BannerImageSection>
                  <Label style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "1rem", display: "block" }}>
                    배너 이미지
                  </Label>
                  <BannerImageBlock
                    className={bannerImage ? "has-image" : ""}
                    onClick={() => bannerInputRef.current?.click()}
                  >
                    {bannerImage ? (
                      <BannerPreview>
                        <img src={bannerImage || "/placeholder.svg"} alt="Banner" />
                        <BannerOverlay>
                          <Button variant="secondary" size="sm">
                            배너 이미지 변경
                          </Button>
                        </BannerOverlay>
                      </BannerPreview>
                    ) : (
                      <>
                        <ImageIcon size={64} color="#ccc" style={{ marginBottom: "1rem" }} />
                        <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem", color: "#333" }}>
                          배너 이미지 추가
                        </h3>
                        <p style={{ color: "#666" }}>클릭하여 컨텐츠의 대표 이미지를 설정하세요</p>
                      </>
                    )}
                  </BannerImageBlock>
                </BannerImageSection>
              </CardContent>
            </FormCard>

            {/* 설정 섹션들을 가로로 배치 */}
            <SettingsSection>
              <FormCard>
                <CardHeader>
                  <CardTitle>사용자 정보</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="userId">사용자 아이디</Label>
                    <Input
                      id="userId"
                      placeholder="사용자 아이디 입력"
                      value={formData.userId}
                      onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                    />
                  </div>
                </CardContent>
              </FormCard>

              <FormCard>
                <CardHeader>
                  <CardTitle>발행 설정</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="published"
                      checked={formData.isPublished}
                      onChange={(checked) => setFormData({ ...formData, isPublished: checked as boolean })}
                    />
                    <Label htmlFor="published">즉시 발행</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={formData.isFeatured}
                      onChange={(checked) => setFormData({ ...formData, isFeatured: checked as boolean })}
                    />
                    <Label htmlFor="featured">추천 컨텐츠로 설정</Label>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button variant="outline" onClick={handleSave}>
                      <Save size={16} style={{ marginRight: "0.5rem" }} />
                      저장
                    </Button>
                    <Button onClick={() => setShowFullPreview(true)} className="lg:hidden">
                      <Eye size={16} style={{ marginRight: "0.5rem" }} />
                      전체 미리보기
                    </Button>
                    <Button onClick={handlePublish}>
                      <Send size={16} style={{ marginRight: "0.5rem" }} />
                      발행하기
                    </Button>
                  </div>
                </CardContent>
              </FormCard>

              <FormCard>
                <CardHeader>
                  <CardTitle>체형 분류 (복수 선택 가능)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {bodyTypes.map((type) => (
                    <div key={type.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={type.id}
                        checked={formData.bodyType.includes(type.id)}
                        onChange={(checked) => {
                          if (checked) {
                            setFormData({ ...formData, bodyType: [...formData.bodyType, type.id] })
                          } else {
                            setFormData({ ...formData, bodyType: formData.bodyType.filter((t) => t !== type.id) })
                          }
                        }}
                      />
                      <Label htmlFor={type.id}>{type.label}</Label>
                    </div>
                  ))}
                </CardContent>
              </FormCard>

              <FormCard>
                <CardHeader>
                  <CardTitle>카테고리 (복수 선택 가능)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={category.id}
                        checked={formData.category.includes(category.id)}
                        onChange={(checked) => {
                          if (checked) {
                            setFormData({ ...formData, category: [...formData.category, category.id] })
                          } else {
                            setFormData({ ...formData, category: formData.category.filter((c) => c !== category.id) })
                          }
                        }}
                      />
                      <Label htmlFor={category.id}>{category.label}</Label>
                    </div>
                  ))}
                </CardContent>
              </FormCard>
            </SettingsSection>

            {/* 에디터와 미리보기 영역 */}
            <EditorContentLayout showPreview={showPreview}>
              <EditorSection>
                <EditorCard>
                  <CardContent style={{ padding: "2rem" }}>
                    {/* 제목 입력 */}
                    <TitleInput
                      placeholder="제목을 입력하세요..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />

                    {/* 블록 컨테이너 */}
                    <BlocksContainer>{blocks.map((block, index) => renderBlock(block, index))}</BlocksContainer>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple={blocks.find((b) => b.id === currentImageBlockId)?.type === "image-gallery"}
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                    />

                    <input
                      ref={bannerInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleBannerUpload}
                      style={{ display: "none" }}
                    />
                  </CardContent>
                </EditorCard>
              </EditorSection>

              <PreviewSection show={showPreview}>
                <PreviewCard>
                  <PreviewHeader>
                    <Eye size={16} />
                    <span style={{ fontSize: "0.875rem", fontWeight: "500" }}>실시간 미리보기</span>
                  </PreviewHeader>
                  <CardContent style={{ padding: "2rem" }}>{renderPreviewContent()}</CardContent>
                </PreviewCard>
              </PreviewSection>
            </EditorContentLayout>
          </ContentLayout>
        ) : (
          // 전체 미리보기 모드 (모바일용)
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">전체 미리보기</h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowFullPreview(false)}>
                  편집으로 돌아가기
                </Button>
                <Button onClick={handlePublish}>
                  <Send size={16} style={{ marginRight: "0.5rem" }} />
                  발행하기
                </Button>
              </div>
            </div>

            <Card>
              <CardContent style={{ padding: "3rem" }}>{renderPreviewContent()}</CardContent>
            </Card>
          </div>
        )}

        {/* 클릭 외부 영역 감지 */}
        {showBlockMenu && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 10,
            }}
            onClick={() => setShowBlockMenu(null)}
          />
        )}
      </MainContent>
    </MainContainer>
  )
}
