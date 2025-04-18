"use client"
import { ArrowLeft, Edit, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface NoteDetailProps {
  note: {
    id: string
    title: string
    content: string
    tags: string[]
    createdAt: string
    updatedAt: string
    folder?: string
  }
  onBack: () => void
}

export function NoteDetail({ note, onBack }: NoteDetailProps) {
  // Function to convert markdown-style links to clickable elements
  const processContent = (content: string) => {
    // Replace [[Link]] with styled links
    const processedContent = content.replace(
      /\[\[(.*?)\]\]/g,
      '<a href="#" class="text-primary underline hover:text-primary/80">$1</a>'
    )

    // Replace # headers with styled headers
    const withHeaders = processedContent
      .replace(/^# (.*?)$/gm, '<h1 class="text-2xl font-bold my-4">$1</h1>')
      .replace(/^## (.*?)$/gm, '<h2 class="text-xl font-semibold my-3">$1</h2>')
      .replace(/^### (.*?)$/gm, '<h3 class="text-lg font-medium my-2">$1</h3>')

    // Replace bullet points
    const withBullets = withHeaders
      .replace(/^- (.*?)$/gm, '<li class="ml-4">$1</li>')
      .replace(/^ {2}- (.*?)$/gm, '<li class="ml-8">$1</li>')

    // Replace checkboxes
    const withCheckboxes = withBullets
      .replace(
        /- \[ \] (.*?)$/gm,
        '<div class="flex items-start gap-2 ml-4"><input type="checkbox" class="mt-1" /><span>$1</span></div>'
      )
      .replace(
        /- \[x\] (.*?)$/gm,
        '<div class="flex items-start gap-2 ml-4"><input type="checkbox" checked class="mt-1" /><span class="line-through">$1</span></div>'
      )

    // Replace numbered lists
    const withNumberedLists = withCheckboxes.replace(
      /^\d+\. (.*?)$/gm,
      '<li class="ml-4 list-decimal">$1</li>'
    )

    // Replace paragraphs
    const withParagraphs = withNumberedLists.replace(/^([^<].*?)$/gm, '<p class="my-2">$1</p>')

    // Replace double line breaks with paragraph breaks
    return withParagraphs.replace(/\n\n/g, "<br />")
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h2 className="text-xl font-semibold">{note.title}</h2>
        <Button variant="outline" size="sm" className="ml-auto">
          <Edit className="mr-1 h-4 w-4" />
          Edit
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <span>Created: {formatDate(note.createdAt)}</span>
        <span>•</span>
        <span>Updated: {formatDate(note.updatedAt)}</span>
        {note.folder && (
          <>
            <span>•</span>
            <span>Folder: {note.folder}</span>
          </>
        )}
      </div>

      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {note.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              <Tag className="mr-1 h-3 w-3" />
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <Card className="p-6">
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: processContent(note.content) }}
        />
      </Card>
    </div>
  )
}
