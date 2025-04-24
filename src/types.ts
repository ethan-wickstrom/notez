/**
 * Represents a single note within the application.
 */
export type Note = {
  /**
   * Unique identifier for the note (e.g., UUID).
   */
  id: string;

  /**
   * The title of the note.
   */
  title: string;

  /**
   * The main content of the note in Markdown format.
   */
  content: string;

  /**
   * ISO 8601 timestamp indicating when the note was created.
   */
  createdAt: string;

  /**
   * ISO 8601 timestamp indicating when the note was last updated.
   */
  updatedAt: string;

  /**
   * Stable ordering index ­– lower values appear first in the list.
   */
  order: number;
};

/**
 * Data required to create a new note (generated fields are omitted).
 */
export type NewNoteData = Omit<
  Note,
  'id' | 'createdAt' | 'updatedAt' | 'order'
>;

/**
 * Data accepted when updating an existing note (all optional).
 */
export type UpdateNoteData = Partial<Omit<Note, 'id' | 'createdAt'>>;