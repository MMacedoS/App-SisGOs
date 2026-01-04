<script setup lang="ts">
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  total: number;
  itemsPerPage?: number;
  currentPage?: number;
}

const props = withDefaults(defineProps<Props>(), {
  itemsPerPage: 10,
  currentPage: 1,
});

const emit = defineEmits<{
  (e: "update:currentPage", page: number): void;
}>();

const handlePageChange = (page: number) => {
  emit("update:currentPage", page);
};
</script>

<template>
  <div class="flex flex-col float-right gap-6">
    <Pagination
      v-slot="{ page }"
      :items-per-page="props.itemsPerPage"
      :total="props.total"
      :default-page="props.currentPage"
      @update:page="handlePageChange"
    >
      <PaginationContent v-slot="{ items }">
        <PaginationPrevious> Anterior </PaginationPrevious>

        <template v-for="(item, index) in items" :key="index">
          <PaginationItem
            v-if="item.type === 'page'"
            :value="item.value"
            :is-active="item.value === page"
          >
            {{ item.value }}
          </PaginationItem>
          <PaginationEllipsis
            v-else-if="item.type === 'ellipsis'"
            :index="index"
          />
        </template>

        <PaginationNext> Próximo </PaginationNext>
      </PaginationContent>
    </Pagination>
  </div>
</template>
