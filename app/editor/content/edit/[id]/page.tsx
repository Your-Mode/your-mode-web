"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/src/shared/components/ui/button"
import { Input } from "@/src/shared/components/ui/input"
import { Label } from "@/src/shared/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/src/shared/components/ui/radio-group"
import { Checkbox } from "@/src/shared/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/components/ui/card"
import { Badge } from "@/src/shared/components/ui/badge"
import { Slider } from "@/src/shared/components/ui/slider"
import {
  Eye,
  EyeOff,
  Save,
  Send,
  X,
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
  Maximize2,
  Minimize2,
  Calendar,
  User,
  ArrowLeft,
} from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import styled from "@emotion/styled"

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
  min-height: 3rem;
  background: transparent;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  line-height: 1.6;
  overflow: hidden;
  white-space: pre-wrap;
  word-wrap: break-word;
  
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
  opacity: 0;
  transition: opacity 0.2s ease;
  min-width: 200px;
  
  ${ImageBlock}:hover & {
    opacity: 1;
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

interface ContentBlock {
  id: string
  type: "paragraph" | "heading1" | "heading2" | "heading3" | "image" | "quote" | "list"
  content: string
  imageUrl?: string
  imageWidth?: number
}

export default function EditorContentEditPage() {
  const router = useRouter()
  const params = useParams()
  const contentId = params.id as string

  const [title, setTitle] = useState("")
  const [bannerImage, setBannerImage] = useState<string | null>(null)
  const [blocks, setBlocks] = useState<ContentBlock[]>([{ id: "1", type: "paragraph", content: "" }])
  const [showBlockMenu, setShowBlockMenu] = useState<string | null>(null)
  const [showFullPreview, setShowFullPreview] = useState(false)
  const [showPreview, setShowPreview] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  const [formData, setFormData] = useState({
    userId: "",
    bodyType: "",
    category: "",
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
    { type: "quote", label: "인용문", icon: Quote },
    { type: "list", label: "목록", icon: List },
  ]

  // 컨텐츠 데이터 로드
  useEffect(() => {
    const loadContent = () => {
      // 실제로는 API에서 데이터를 가져와야 함
      // 여기서는 샘플 데이터로 시뮬레이션
      const sampleContent = {
        id: contentId,
        title: "웨이브 체형을 위한 여름 스타일링 가이드",
        bannerImage: "/placeholder.svg?height=300&width=800",
        userId: "fashion_editor",
        bodyType: "wave",
        category: "styling",
        isPublished: true,
        isFeatured: false,
        blocks: [
          {
            id: "1",
            type: "paragraph" as const,
            content:
              "웨이브 체형의 특징을 살린 여름 코디 방법을 자세히 알아보세요.\n\n부드러운 라인과 여성스러운 실루엣을 강조하는 스타일링 팁을 제공합니다.",
          },
          {
            id: "2",
            type: "heading2" as const,
            content: "웨이브 체형의 특징",
          },
          {
            id: "3",
            type: "paragraph" as const,
            content:
              "웨이브 체형은 곡선이 아름다운 체형으로, 허리 라인이 잘록하고 상체와 하체의 균형이 잘 맞는 것이 특징입니다.",
          },
        ],
      }

      setTitle(sampleContent.title)
      setBannerImage(sampleContent.bannerImage)
      setFormData({
        userId: sampleContent.userId,
        bodyType: sampleContent.bodyType,
        category: sampleContent.category,
        isPublished: sampleContent.isPublished,
        isFeatured: sampleContent.isFeatured,
      })
      setBlocks(sampleContent.blocks)
      setIsLoading(false)
    }

    loadContent()
  }, [contentId])

  // Auto-resize textarea
  const autoResize = (element: HTMLTextAreaElement) => {
    element.style.height = "auto"
    const scrollHeight = element.scrollHeight
    const minHeight = 48 // 3rem in pixels
    element.style.height = Math.max(scrollHeight, minHeight) + "px"
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

  const updateImageWidth = (id: string, width: number) => {
    setBlocks(blocks.map((block) => (block.id === id ? { ...block, imageWidth: width } : block)))
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
    const file = event.target.files?.[0]
    if (file && currentImageBlockId) {
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
          {block.type === "image" ? (
            <ImageBlock
              className={block.imageUrl ? "has-image" : ""}
              onClick={() => {
                if (!block.imageUrl) {
                  setCurrentImageBlockId(block.id)
                  fileInputRef.current?.click()
                }
              }}
            >
              {block.imageUrl ? (
                <ImagePreview width={block.imageWidth || 100}>
                  <img src={block.imageUrl || "/placeholder.svg"} alt="Content" />
                  <ImageControls>
                    <ImageControlButton
                      onClick={(e) => {
                        e.stopPropagation()
                        setCurrentImageBlockId(block.id)
                        fileInputRef.current?.click()
                      }}
                    >
                      <ImageIcon size={14} />
                    </ImageControlButton>
                    <ImageControlButton
                      onClick={(e) => {
                        e.stopPropagation()
                        setBlocks(blocks.map((b) => (b.id === block.id ? { ...b, imageUrl: undefined } : b)))
                      }}
                    >
                      <X size={14} />
                    </ImageControlButton>
                  </ImageControls>
                  <ImageSizeControls>
                    <Minimize2 size={14} />
                    <Slider
                      value={[block.imageWidth || 100]}
                      onValueChange={(value) => updateImageWidth(block.id, value[0])}
                      max={100}
                      min={30}
                      step={10}
                      className="flex-1"
                    />
                    <Maximize2 size={14} />
                    <span style={{ fontSize: "0.75rem", minWidth: "35px" }}>{block.imageWidth || 100}%</span>
                  </ImageSizeControls>
                </ImagePreview>
              ) : (
                <>
                  <ImageIcon size={48} color="#ccc" style={{ marginBottom: "1rem" }} />
                  <p>클릭하여 이미지를 추가하세요</p>
                </>
              )}
            </ImageBlock>
          ) : block.type.startsWith("heading") ? (
            <BlockInput
              placeholder={`${blockTypes.find((t) => t.type === block.type)?.label} 입력...`}
              value={block.content}
              onChange={(e) => updateBlock(block.id, e.target.value)}
              style={{
                fontSize: block.type === "heading1" ? "2rem" : block.type === "heading2" ? "1.5rem" : "1.25rem",
                fontWeight: "600",
              }}
            />
          ) : (
            <AutoResizeTextarea
              placeholder={`${blockTypes.find((t) => t.type === block.type)?.label} 입력...`}
              value={block.content}
              onChange={(e) => {
                updateBlock(block.id, e.target.value)
                setTimeout(() => autoResize(e.target), 0)
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement
                setTimeout(() => autoResize(target), 0)
              }}
              style={{
                fontStyle: block.type === "quote" ? "italic" : "normal",
                borderLeft: block.type === "quote" ? "4px solid #ff3e6c" : "none",
                paddingLeft: block.type === "quote" ? "1rem" : "0.75rem",
              }}
            />
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
            {formData.bodyType && (
              <Badge variant="outline">{bodyTypes.find((t) => t.id === formData.bodyType)?.label}</Badge>
            )}
            {formData.category && (
              <Badge variant="outline">{categories.find((c) => c.id === formData.category)?.label}</Badge>
            )}
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
          if (block.type === "image" && block.imageUrl) {
            return (
              <div key={block.id} style={{ textAlign: "center", margin: "2rem 0" }}>
                <img
                  src={block.imageUrl || "/placeholder.svg"}
                  alt="Content"
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

          if (block.content) {
            if (block.type === "heading1") {
              return <h1 key={block.id}>{block.content}</h1>
            } else if (block.type === "heading2") {
              return <h2 key={block.id}>{block.content}</h2>
            } else if (block.type === "heading3") {
              return <h3 key={block.id}>{block.content}</h3>
            } else if (block.type === "quote") {
              return <blockquote key={block.id}>{block.content}</blockquote>
            } else {
              return <p key={block.id}>{block.content}</p>
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

  const handleUpdate = () => {
    const content = { id: contentId, title, bannerImage, blocks, ...formData }
    console.log("Updating content:", content)
    alert("컨텐츠가 수정되었습니다.")
    router.push("/editor/content")
  }

  if (isLoading) {
    return (
      <MainContainer>
        <MainContent>
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600">컨텐츠를 불러오는 중...</p>
            </div>
          </div>
        </MainContent>
      </MainContainer>
    )
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
              <PageTitle>컨텐츠 수정</PageTitle>
              <PageDescription>
                기존 컨텐츠를 수정하고 업데이트할 수 있습니다. 실시간 미리보기를 확인하며 편집해보세요.
              </PageDescription>
            </HeaderContent>
          </HeaderLeft>
          <HeaderRight>
            <ToggleButton variant="outline" size="sm" active={showPreview} onClick={() => setShowPreview(!showPreview)}>
              {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
              <span style={{ marginLeft: "0.5rem" }}>{showPreview ? "미리보기 끄기" : "미리보기 켜기"}</span>
            </ToggleButton>
          </HeaderRight>
        </PageHeader>

        {/* 에디터 컨텐츠 헤더 섹션 */}
        <div style={{ marginBottom: "2rem" }}>
          <Card>
            <CardContent style={{ padding: "2rem" }}>
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  marginBottom: "1rem",
                  color: "#333",
                }}
              >
                에디터 컨텐츠
              </h2>
              <p
                style={{
                  color: "#666",
                  fontSize: "1rem",
                  lineHeight: "1.6",
                  marginBottom: "1rem",
                }}
              >
                전문 패션 에디터들이 제안하는 스타일링 팁과 트렌드 분석을 만나보세요. 체형별 맞춤 스타일링 가이드와
                시즌별 트렌드를 확인할 수 있습니다.
              </p>
              <div
                style={{
                  height: "3px",
                  background: "linear-gradient(90deg, #ff3e6c 0%, #ff6b9d 100%)",
                  borderRadius: "2px",
                  width: "60px",
                }}
              />
            </CardContent>
          </Card>
        </div>

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
                      onCheckedChange={(checked) => setFormData({ ...formData, isPublished: checked as boolean })}
                    />
                    <Label htmlFor="published">즉시 발행</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={formData.isFeatured}
                      onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: checked as boolean })}
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
                    <Button onClick={handleUpdate}>
                      <Send size={16} style={{ marginRight: "0.5rem" }} />
                      수정 완료
                    </Button>
                  </div>
                </CardContent>
              </FormCard>

              <FormCard>
                <CardHeader>
                  <CardTitle>체형 분류</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.bodyType}
                    onValueChange={(value) => setFormData({ ...formData, bodyType: value })}
                  >
                    {bodyTypes.map((type) => (
                      <div key={type.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={type.id} id={type.id} />
                        <Label htmlFor={type.id}>{type.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </FormCard>

              <FormCard>
                <CardHeader>
                  <CardTitle>카테고리</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={category.id} id={category.id} />
                        <Label htmlFor={category.id}>{category.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
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
                <Button onClick={handleUpdate}>
                  <Send size={16} style={{ marginRight: "0.5rem" }} />
                  수정 완료
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
